import Vue from 'vue'
import Vuex from 'vuex'
import {getMsgs} from "./api/API";

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        count: 0,
        sessions: new Map(),
        temp: 0,
        goodsId:0,
        socketState: 'close',
        cateLogs:[]
    },
    getters: {
        getCateLogName(state){
            return (id)=>{
                return state.cateLogs.find(item => {
                    return item.id === id
                })
            }
        }
    },
    mutations: {
        setCateLogs(state,data){
          state.cateLogs = data
        },
        changeSocketState (state, data) {
            state.socketState = data
            state.temp++
        },
        setGoodsId(state,data){
            state.goodsId = data
        },
        addNewSession (state, data) {
            state.temp++
            if(this.state.sessions.get(data.k)){
                return
            }
            state.sessions.set(data.k, data.v)
        },
        refreshAllSession (state, data) {
            state.sessions = new Map()
            for (let msg of data) {
                state.sessions.set(msg.sessionId, {
                    lastMsg: msg,
                    msgs: []
                })
            }
            for (let sid of state.sessions.keys()) {
                getMsgs(sid).then(e => {
                    state.sessions.get(sid).msgs = e.content
                })
            }
            state.temp++
        },
        newMsg (state, data) {
            state.temp++
            if(!state.sessions.get(data.sid)){
                this.commit('addNewSession',{k:data.sid,v:{lastMsg:{...data,lastMsg: data.msg},msgs:[data]}})
                return
            }
            state.sessions.get(data.sid).lastMsg = {...data,lastMsg: data.msg}
            state.sessions.get(data.sid).msgs.unshift(data)
        }
    }
})
