const RequestApplicant = require('../models/RequestApplicant');
const sequelize = require('../config/database');
const { Op } = require('sequelize');

exports.createRequestApplicant = async (data) => {
    return RequestApplicant.create(data);
}

exports.getAllRequestApplicants = async () => {
    return await RequestApplicant.findAll();
}

exports.getRequestApplicantsByRequestIdx = async (requestIdxList, data) => {
    try {
        const offset = (data.page - 1) * data.limit;
        // request_idx 값이 배열에 포함된 데이터들을 검색
        const applicants = await RequestApplicant.findAll({
            where: {
                request_idx: {
                    [Op.in]: requestIdxList // 배열에 있는 값들을 조건으로 설정
                },
                is_canceled: false,
                applicant_state: "대기",

            },
            limit: data.limit,  // 한 페이지에 표시할 최대 데이터 수
            offset: offset // 시작 위치 (페이지 번호에 따라 계산된 값)
        });
        return applicants;
    } catch (error) {
        console.error('Error fetching request applicants by request_idx:', error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
    }
};

exports.getFetchRequestInfosByUser = async (user_idx, data) => {
    try {
        const offset = (data.page - 1) * data.limit;
        // request_idx 값이 배열에 포함된 데이터들을 검색
        const applicants = await RequestApplicant.findAll({
            where: {
                user_idx:user_idx,

            },
            limit: data.limit,  // 한 페이지에 표시할 최대 데이터 수
            offset: offset // 시작 위치 (페이지 번호에 따라 계산된 값)
        });
        return applicants;
    } catch (error) {
        console.error('Error fetching requestInfos by user_idx:', error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
    }
};

exports.updateRequestApplicant = async (data) => {

    return await RequestApplicant.update({
        applicant_state: data.applicant_state,
        is_canceled: data.is_canceled
    }, {
        where: {
            request_idx: data.request_idx
        }
    });
}

exports.updateRequestAllApplicantForReject = async (request_idx, applicant_state) => {

    return await RequestApplicant.update({
        applicant_state: applicant_state,
    }, {
        where: {
            request_idx: request_idx, //특정 의뢰에 지원한 사람들 중
            applicant_state: "대기", //상태가 대기중인 지원자들에 한하여
        }
    });
}