import {get, post} from './index'
import main from "../main";

function publishGoods (data) {
    return post('/goods', data);

}
function getGoods (catelogId, pageSize, pageNum) {
    return get('/goods', {
        catelogId, pageSize, pageNum
    })
}

function login (name, pwd) {
    return post('/user/login', {name, pwd})
}

function searchByEqual (pageSize, pageNum, data) {
    return post('/goods/search?pageNum=' + pageNum + '&&pageSize=' + pageSize, data)
}

function getGoodsDetail (id) {
    return get('/goods/' + id);
}

function getSessionList () {
    return get('/chat/list')
}

function getHot () {
    return get('/goods/hot')
}

function getMsgs (sid) {
    return get('/chat/' + sid)
}

function getSessionId (gid) {
    return get('/goods/' + gid + '/session')
}

function createSession (gid) {
    return post('/chat/' + gid)
}

function getCateLog () {
    return get('/goods/catelog')
}

function uploadImg(data){
    return post('/goods/upload/',data)
}

function getGoodsPre(gid){
    return get('/goods/pre/'+gid)
}
function register(userData){
    return post('/user/reg',userData)
}
function getGoodsByState(state){
    return post('/goods/state/'+state)
}
function getUserInfo(uid){
    return get('/user/'+uid)
}
function logOut(){
    localStorage.clear()
    main.$root.$ws.close()
}

export {
    publishGoods,
    getGoods,
    searchByEqual,
    login,
    logOut,
    getGoodsDetail,
    getSessionList,
    getHot,
    getMsgs,
    getSessionId,
    createSession,
    getCateLog,
    uploadImg,
    getGoodsPre,
    getGoodsByState,
    register,
    getUserInfo
}
