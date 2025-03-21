const reportService = require('../../services/03-myPage/reportService');
const logger = require('../../config/winston/logger');
const requestIp = require('request-ip');

exports.createReport = async (req, res) => {
    /*
    #swagger.description = "새로운 신고 정보 추가"
    #swagger.tags = ['report - 신고 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "report_user_idx": 3,
            "reported_user_idx": 2,
            "report_type": "욕설/비방"
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} PUT /api/report`);
        const resData = await reportService.createReport(req.body);
        res.status(201).json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} PUT /api/report 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
};

exports.getAllReports = async (req, res) => {
    /*
    #swagger.description = "신고 정보 전체 조회"
    #swagger.tags = ['report - 신고 정보 테이블']
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/report/all`);
        const resData = await reportService.getAllReports();
        res.json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/report/all 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}
exports.getReportsByUser = async (req, res) => {
    /*
    #swagger.description = "사용자에 대한 신고 정보 조회"
    #swagger.tags = ['report - 신고 정보 테이블']
    #swagger.parameters['obj'] = {
        in: 'body',
        required: true,
        schema: {
            "user_idx": 2
        }
    }
    */
    try{
        logger.info(`${requestIp.getClientIp(req)} POST /api/report/byUser`);
        const resData = await reportService.getReportsByUser(req.body.user_idx);
        res.json(resData);
    } catch (e){
        logger.error(`${requestIp.getClientIp(req)} POST /api/report/byUser 500 ERROR: ${e.message}`);
        res.status(500).json({message: e.message});
    }
}