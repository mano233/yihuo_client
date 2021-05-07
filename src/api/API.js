import {get, post, put} from './index'
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
function getGoodsByState(uid,state){
    return post('/goods/state/'+uid+'/'+state)
}
function getUserInfo(uid){
    return get('/user/'+uid)
}
function logOut(){
    localStorage.clear()
    main.$root.$ws.close()
}
function getSessionInfo(sessionID){
    return get('/chat/session/'+sessionID)
}
function deleteGood(gid){
    return post('/goods/delete/'+gid)
}

function dealGood(gid){
    return post('/goods/deal/'+gid);
}

function getComment(gid){
    return get('/goods/comment/'+gid)
}
function comment(gid,content){
    let data = new FormData()
    data.append('content',content)
    data.append('gid',gid)
    return post('/goods/comment/',data)
}

function updateGoods(data){
    return put('/goods/update',data)
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
    getUserInfo,
    getSessionInfo,
    deleteGood,
    dealGood,
    getComment,
    updateGoods,
    comment
}
