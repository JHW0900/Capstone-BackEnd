const express = require('express');
const creditHistoryController = require('../controllers/creditHistoryController');

const router = express.Router();

/**
 * 새로운 credit 거래 내역 삽입
 */
router.put('/', creditHistoryController.createCreditHistory);
/**
 * 특정 credit 거래 내역 조회
 */
router.post('/', creditHistoryController.getCreditHistoryByIdx);
/**
 * 모든 credit 거래 내역 조회
 */
router.post('/all', creditHistoryController.getAllCreditHistory);
/**
 * credit 거래 내역 수정
 */
router.post('/update', creditHistoryController.updateCreditHistory);

module.exports = router;