const requestApplicantService = require('../services/requestApplicantService');
const logger = require('../config/winston/logger');
const requestIp = require('request-ip');

exports.createRequestApplicant= async (req, res) => {
    /*
    #swagger.description = "새로운 의뢰 지원자 정보 추가"
    #swagger.tags = ['requestApplicant - 의뢰 지원자 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "request_idx": 1,
            "applicant_idx": 2,
            "applicant_state": "지원성공"
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/requestApplicant`);
        const RequestApplicant = await requestApplicantService.createRequestApplicant(req.body);
        res.status(201).json(RequestApplicant);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/requestApplicant 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllRequestApplicants = async (req, res) => {
    /*
    #swagger.description = "의뢰 지원자 정보 전체 조회"
    #swagger.tags = ['requestApplicant - 의뢰 지원자 정보 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestApplicant/all`);
        const RequestApplicant = await requestApplicantService.getAllRequestApplicants();
        res.json(RequestApplicant);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestApplicant/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateRequestApplicant = async (req, res) => {
    /*
    #swagger.description = "의뢰 지원자 정보 갱신"
    #swagger.tags = ['requestApplicant - 의뢰 지원자 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "request_idx": 1,
            "applicant_idx": 2,
            "applicant_state": "선발보류"
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestApplicant/update`);
        const RequestApplicant = await requestApplicantService.updateRequestApplicant(req.body);
        res.json(RequestApplicant);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestApplicant/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}