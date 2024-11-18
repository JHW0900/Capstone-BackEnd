const requestInfoService = require('../services/requestInfoService');
const logger = require('../config/winston/logger');
const requestIp = require('request-ip');

exports.createRequestInfo= async (req, res) => {
    /*
    #swagger.description = "새로운 의뢰 정보 추가"
    #swagger.tags = ['requestInfo - 의뢰 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 1,
            "request_region": "경남",
            "request_title": "공사장 야리끼리 3인 급구!",
            "request_content": "제목이랑 같습니다. 야리끼리로 하루 일하실 성인남성 3분 구합니다.",
            "request_cost": "시급 2만원",
            "request_state": "미완료",
            "transaction_state": "거래미완",
            "applicant_idx": 2
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/requestInfo`);
        const requestInfo = await requestInfoService.createRequestInfo(req.body);
        res.status(201).json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/requestInfo 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllRequestInfos = async (req, res) => {
    /*
    #swagger.description = "의뢰 정보 전체 조회"
    #swagger.tags = ['requestInfo - 의뢰 정보 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestInfo/all`);
        const requestInfo = await requestInfoService.getAllRequestInfos();
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestInfo/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.getRequestInfoByIdx = async (req, res) => {
    /*
    #swagger.description = "특정 의뢰 정보 조회"
    #swagger.tags = ['requestInfo - 의뢰 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "request_idx": 1
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestInfo`);
        const requestInfo = await requestInfoService.getRequestInfoByIdx(req.body.request_idx);
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestInfo 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}

exports.updateRequestInfo = async (req, res) => {
    /*
    #swagger.description = "의뢰 정보 갱신"
    #swagger.tags = ['requestInfo - 의뢰 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "request_idx": 1,
            "user_idx": 1,
            "request_region": "경남",
            "request_title": "공사장 야리끼리 1인 급구!",
            "request_content": "2분 지원완료 됬습니다. 마지막 1분 모집합니다",
            "request_cost": "시급 2만원",
            "request_state": "미완료",
            "transaction_state": "거래미완",
            "applicant_idx": 2
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/requestInfo/update`);
        const requestInfo = await requestInfoService.updateRequestInfo(req.body);
        res.json(requestInfo);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/requestInfo/update 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}