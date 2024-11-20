const UserCreditInfo = require('../models/UserCreditInfo');
const sequelize = require('../config/database');
const esClient = require('../config/esClient');

exports.createUserCreditInfo = async (data) => {
    const credit = await UserCreditInfo.create(data);

    await esClient.index({
        index: 'user_credit_info',
        id: credit.user_idx,
        body: credit
    });

    return credit;
}

exports.getAllUserCreditInfos = async () => {
    const { body } = await esClient.search({
        index: 'user_credit_info',
        body: {
            query: {
                match_all: {}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return await RequestInfo.findAll();
}

exports.getUserCreditInfosByIdx = async (user_idx) => {
    const { body } = await esClient.search({
        index: 'user_credit_info',
        body: {
            query: {
                term: { user_idx: user_idx}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
}


exports.updateUserCreditInfo = async (data) => {

    await UserCreditInfo.update({
        user_idx: data.user_idx,
        credit_amount: data.credit_amount,
    }, {
        where: {
            user_idx: data.user_idx,
        }
    });

    await esClient.update({
        index: 'user_credit_info',
        id: data.user_idx,
        body: {
            doc: data
        }
    });

    return data;
}