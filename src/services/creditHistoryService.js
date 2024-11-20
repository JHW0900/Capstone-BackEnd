const CreditHistory = require('../models/CreditHistory');
const sequelize = require('../config/database');
const esClient = require('../config/esClient');

exports.createCreditHistory = async (data) => {
    const now = new Date();
    data.trade_time = now.toISOString();

    const history = await CreditHistory.create(data);

    await esClient.index({
        index: 'credit_history',
        id: history.credit_trade_idx,
        body: history
    });

    return history;
    //return RequestInfo.create(data);
}

exports.getAllCreditHistory = async () => {
    const { body } = await esClient.search({
        index: 'credit_history',
        body: {
            query: {
                match_all: {}
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return await RequestInfo.findAll();
}

exports.getCreditHistoryByIdx = async (credit_trade_idx) => {
    const { body } = await esClient.search({
        index: 'credit_history',
        body: {
            query: {
                term: { credit_trade_idx: credit_trade_idx }
            }
        }
    });

    return body.hits.hits.map(hit => hit._source);
    //return RequestInfo.findByPk(request_idx);
}

exports.updateCreditHistory = async (data) => {
    const now = new Date();
    data.updated_time = now.toISOString();

    await CreditHistory.update({
        credit_trade_idx: data.credit_trade_idx,
        host_user_idx: data.host_user_idx,
        apply_user_idx: data.apply_user_idx,
        request_idx: data.request_idx,
        trade_amount: data.trade_amount,
        updated_time:data.updated_time,
    }, {
        where: {
            credit_trade_idx: data.credit_trade_idx,
        }
    });
    await esClient.update({
        index: 'credit_history',
        id: data.credit_trade_idx,
        body: {
            doc: data
        }
    });
    return data;
}