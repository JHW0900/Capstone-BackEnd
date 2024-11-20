const userCreditInfoService = require('../services/userCreditInfoService');
const logger = require('../config/winston/logger');
const requestIp = require('request-ip');

exports.createUserCreditInfo = async (req, res) => {
    /*
    #swagger.description = "사용자 소유 크레딧 수량 추가"
    #swagger.tags = ['UserCreditInfo - 사용자 소유 크레딧 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "credit_amount": 200,
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/UserCreditInfo`);
        const creditAmount = await userCreditInfoService.createUserCreditInfo(req.body);
        res.status(201).json(creditAmount);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/UserCreditInfo 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllUserCreditInfos = async (req, res) => {
    /*
    #swagger.description = "사용자 소유 크레딧 수량 추가"
    #swagger.tags = ['UserCreditInfo - 사용자 소유 크레딧 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/UserCreditInfo/all`);
        const creditAmount = await userCreditInfoService.getAllUserCreditInfos();
        res.json(creditAmount);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/UserCreditInfo/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getUserCreditInfosByIdx = async (req, res) => {
    /*
    #swagger.description = "사용자 소유 크레딧 수량 추가"
    #swagger.tags = ['UserCreditInfo - 사용자 소유 크레딧 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/UserCreditInfo`);
        const creditAmount = await userCreditInfoService.getUserCreditInfosByIdx(req.body.user_idx);
        res.json(creditAmount);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/UserCreditInfo 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateUserCreditInfo = async (req, res) => {
    /*
    #swagger.description = "사용자 소유 크레딧 수량 추가"
    #swagger.tags = ['UserCreditInfo - 사용자 소유 크레딧 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "credit_amount": 120,
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/UserCreditInfo/update`);
        const creditAmount = await userCreditInfoService.updateUserCreditInfo(req.body);
        res.json(creditAmount);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/UserCreditInfo/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}