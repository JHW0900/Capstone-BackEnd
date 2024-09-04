const chatListService = require('../services/chatListService');
const logger = require('../config/winston/logger');
const requestIp = require('request-ip');

exports.createChatList = async (req, res) => {
    /*
    #swagger.description = "커뮤니티 게시글에 대한 새로운 댓글 추가"
    #swagger.tags = ['ChatList - 커뮤니티 댓글 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "post_idx": 1,
            "user_idx": 1,
            "cmt_detail": "댓글 내용 입니다."
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/ChatList`);
        const chatData = await chatListService.createChatList(req.body);
        res.status(201).json(chatData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/ChatList 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllChatLists = async (req, res) => {
    /*
    #swagger.description = "커뮤니티 게시글에 대한 댓글 조회"
    #swagger.tags = ['ChatList - 커뮤니티 댓글 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "post_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/ChatList/all`);
        const chatData = await chatListService.getAllChatLists();
        res.json(chatData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/ChatList/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getChatListsByIdx = async (req, res) => {
    /*
    #swagger.description = "커뮤니티 사용자에 대한 댓글 조회"
    #swagger.tags = ['ChatList - 커뮤니티 댓글 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/ChatList`);
        const chatData = await chatListService.getChatListsByIdx(req.body.user_idx);
        res.json(chatData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/ChatList 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateCommunityPost = async (req, res) => {
    /*
    #swagger.description = "커뮤니티 댓글 정보 갱신"
    #swagger.tags = ['ChatList - 커뮤니티 댓글 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "cmt_idx": 1,
            "post_idx": 1,
            "user_idx": 1,
            "cmt_detail": "수정된 댓글입니다."
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/ChatList/update`);
        const chatData = await chatListService.updateChatList(req.body);
        res.json(chatData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/ChatList/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}