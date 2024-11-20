const express = require('express');
const userInfoRoutes = require('./userInfoRoutes');
const userRelationRoutes = require('./userRelationRoutes');
const communityPostRoutes = require('./communityPostRoutes');
const communityCommentRoutes = require('./communityCommentRoutes');
const reportRoutes = require('./reportRoutes');
const keywordRoutes = require('./keywordRoutes');
const alarmTypeRoutes = require('./alarmTypeRoutes');
const interestRequestRoutes = require('./interestRequestRoutes');
const requestInfoRoutes = require('./requestInfoRoutes');
const requestApplicantRoutes = require('./requestApplicantRoutes');
const chatRoomRoutes = require('./chatRoomRoutes');
const chatListRoutes = require('./chatListRoutes');
const chatMessageRoutes = require('./chatMessageRoutes');
const userCreditInfoRoutes = require('./userCreditInfoRoutes');
const creditHistoryRoutes = require('./creditHistoryRoutes');



const router = express.Router();

router.use('/userInfo', userInfoRoutes);
router.use('/userRelation', userRelationRoutes);
router.use('/communityPost', communityPostRoutes);
router.use('/communityComment', communityCommentRoutes);
router.use('/report', reportRoutes);
router.use('/keyword', keywordRoutes);
router.use('/alarmType', alarmTypeRoutes);
router.use('/interestRequest', interestRequestRoutes);
router.use('/requestInfo', requestInfoRoutes);
router.use('/requestApplicant', requestApplicantRoutes);
router.use('/chatRoom', chatRoomRoutes);
router.use('/chatList', chatListRoutes);
router.use('/chatMessage', chatMessageRoutes);
router.use('/userCreditInfo', userCreditInfoRoutes);
router.use('/creditHistory', creditHistoryRoutes);


module.exports = router;