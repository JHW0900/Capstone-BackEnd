const express = require('express');
const chatRoomController = require('../controllers/chatRoomController');

const router = express.Router();

/**
 * 새로운 댓글 정보 삽입
 */
router.put('/', chatRoomController.createChatRoom);
/**
 * 게시글에 대한 모든 댓글 조회
 */
router.post('/', chatRoomController.getChatRoomsByIdx);
/**
 * 사용자에 대한 모든 댓글 조회
 */
router.post('/all', chatRoomController.getAllChatRooms);
/**
 * 특정 댓글 수정
 */
router.post('/update', chatRoomController.updateCommunityPost);

module.exports = router;