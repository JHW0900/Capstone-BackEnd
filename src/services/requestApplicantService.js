const RequestApplicant = require('../models/RequestApplicant');
const sequelize = require('../config/database');
const { Op } = require('sequelize');
const RequestInfo = require('../models/RequestInfo');

exports.createRequestApplicant = async (data) => {
    const existingApplicant = await RequestApplicant.findOne({
        where: {
            user_idx: data.user_idx,
            request_idx: data.request_idx,
            applicant_state: { [Op.in]: ["대기", "승인"] },
            is_canceled: false
        }
    });
    if (existingApplicant) {
        return { http_status: "fail" };
    }
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
        const offset = (data.page - 1) * data.limit; // 페이지 시작 위치 계산

        const result = await sequelize.query(
            `
            SELECT ra.*, ri.request_title, ri.request_content, ri.request_region, ri.request_cost, ri.request_state, ri.created_date, ri.updated_time
            FROM TB_REQUEST_APPLICANT ra
            JOIN TB_REQUEST_INFO ri USING(request_idx)
            WHERE ra.user_idx = :user_idx
            ORDER BY ra.request_idx DESC
            LIMIT :limit OFFSET :offset
            `,
            {
                replacements: {
                    user_idx,      // `:user_idx`에 값을 바인딩
                    limit: data.limit,   // `:limit`에 페이지당 데이터 수를 바인딩
                    offset: offset,      // `:offset`에 계산된 오프셋 값 바인딩
                },
                type: sequelize.QueryTypes.SELECT, // 쿼리 유형 지정 (SELECT)
            }
        );

        return result;
    } catch (error) {
        console.error('Error fetching requestInfos by user_idx:', error);
        throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 합니다.
    }
};

exports.getApplicantInfoByUser = async (user_idx, data) => {
    try{
        const offset = (data.page - 1) * data.limit;
        const result = await sequelize.query(
            `
                SELECT
                    ri.request_title,
                    ri.request_idx,
                    ui.user_nickname,
                    ui.user_id,
                    ui.user_idx,
                    ra.applicant_intro,
                    ra.applicant_state,
                    ri.request_region
                FROM TB_REQUEST_INFO ri
                         JOIN TB_REQUEST_APPLICANT ra ON ri.request_idx = ra.request_idx
                         JOIN TB_USER_INFO ui ON ra.user_idx = ui.user_idx
                WHERE ri.user_idx = :user_idx
                ORDER BY ri.request_idx DESC
                    LIMIT :limit OFFSET :offset
            `,
            {
                replacements: {
                    user_idx,      // `:user_idx`에 값을 바인딩
                    limit: data.limit,   // `:limit`에 페이지당 데이터 수를 바인딩
                    offset: offset,      // `:offset`에 계산된 오프셋 값 바인딩
                },
                type: sequelize.QueryTypes.SELECT, // 쿼리 유형 지정 (SELECT)
            }
        );
        if (!result || result.length === 0) {
            return [];
        }

        return result;

    }catch (error){
        console.error('Error fetching request applicants by user_idx:', error);
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