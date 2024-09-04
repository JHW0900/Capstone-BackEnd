const express = require('express');
const chatMessageController = require('../controllers/chatMessageController');

const router = express.Router();

/**
 * 새로운 댓글 정보 삽입
 */
router.put('/', chatMessageController.createChatMessage);
/**
 * 게시글에 대한 모든 댓글 조회
 */
router.post('/', chatMessageController.getChatMessagesByRoom);
/**
 * 사용자에 대한 모든 댓글 조회
 */
router.post('/all', chatMessageController.getAllChatMessages);
/**
 * 특정 댓글 수정
 */
router.post('/update', chatMessageController.updateCommunityPost);

module.exports = router;