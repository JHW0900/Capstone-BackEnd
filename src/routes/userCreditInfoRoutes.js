const express = require('express');
const userCreditInfoController = require('../controllers/userCreditInfoController');

const router = express.Router();

/**
 * 새로운 크레딧 소유량 정보 삽입
 */
router.put('/', userCreditInfoController.createUserCreditInfo);
/**
 * 모든 크레딧 소유량 조회
 */
router.post('/', userCreditInfoController.getUserCreditInfosByIdx);
/**
 * 각 사용자에 대한 크레딧 소유량 조회
 */
router.post('/all', userCreditInfoController.getAllUserCreditInfos);
/**
 * 특정 사용자의 크레딧 소유량 수정
 */
router.post('/update', userCreditInfoController.updateUserCreditInfo);

module.exports = router;