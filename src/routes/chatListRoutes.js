const express = require('express');
const chatListController = require('../controllers/chatListController');

const router = express.Router();

/**
 * 새로운 댓글 정보 삽입
 */
router.put('/', chatListController.createChatList);
/**
 * 게시글에 대한 모든 댓글 조회
 */
router.post('/', chatListController.getChatListsByIdx);
/**
 * 사용자에 대한 모든 댓글 조회
 */
router.post('/all', chatListController.getAllChatLists);
/**
 * 특정 댓글 수정
 */
router.post('/update', chatListController.updateChatList);

module.exports = router;