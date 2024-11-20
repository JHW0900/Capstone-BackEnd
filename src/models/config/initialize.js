const sequelize = require('@src/config/database');
const logger = require('@src/config/winston/logger');
const process = require("process");
const esClient = require('@src/config/esClient');


const initialize = async () => {
    await sequelize.sync({force: true});
    try{
        if(process.env.NODE_ENV != "production") {
            try {
                // 모든 인덱스 삭제
                await esClient.indices.delete({ index: '_all' });
                logger.info('Deleted all indices');
            } catch (error) {
                logger.error('Failed to delete all indices', error);
            }

            logger.info('Database synchronized');

            // Insert UserInfo data
            const insertUserInfo = require('@src/models/dummy/insertUserInfo');
            await insertUserInfo();

            // Insert UserRelation data
            const insertUserRelation = require('@src/models/dummy/insertUserRelation');
            await insertUserRelation();

            // Insert CommunityPost data
            const insertCommunityPost = require('@src/models/dummy/insertCommunityPost');
            await insertCommunityPost();

            // Insert CommunityComment data
            const insertCommunityComment = require('@src/models/dummy/insertCommunityComment');
            await insertCommunityComment();

            // Insert Report data
            const insertReport = require('@src/models/dummy/insertReport');
            await insertReport();

            // Insert Keyword data
            const insertKeyword = require('@src/models/dummy/insertKeyword');
            await insertKeyword();

            // Insert AlarmType data
            const insertAlarmType = require('@src/models/dummy/insertAlarmType');
            await insertAlarmType();

            // Insert InterestRequest data
            const insertInterestRequest = require('@src/models/dummy/insertInterestRequest');
            await insertInterestRequest();

            // Insert RequestInfo data
            const insertRequestInfo = require('@src/models/dummy/insertRequestInfo');
            await insertRequestInfo();

            // Insert RequestApplicant data
            const insertRequestApplicant = require('@src/models/dummy/insertRequestApplicant');
            await insertRequestApplicant();

            // Insert ChatRoom data
            const insertChatRoom = require('@src/models/dummy/insertChatRoom');
            await insertChatRoom();

            // Insert ChatList data
            const insertChatList = require('@src/models/dummy/insertChatList');
            await insertChatList();

            // Insert ChatMessage data
            const insertChatMessage = require('@src/models/dummy/insertChatMessage');
            await insertChatMessage();

            // Insert UserCreditInfo data
            const insertUserCreditInfo = require('@src/models/dummy/insertUserCreditInfo');
            await insertUserCreditInfo();

            // Insert CreditHistory data
            const insertCreditHistory = require('@src/models/dummy/insertCreditHistory');
            await insertCreditHistory();

            logger.info('Initial data inserted');
        }
    } catch(e){
        logger.error(`models/initialize.js => ${e.message}`);
    }
};

module.exports = initialize;