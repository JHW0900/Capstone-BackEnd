const CreditHistory = require('@src/models/RequestInfo');
const esClient = require('@src/config/esClient');

const insertCreditHistory = async () => {
    const history = await CreditHistory.bulkCreate([
        {
            "host_user_idx": 1,
            "apply_user_idx": 2,
            "request_idx":3,
            "trade_amount": 120,
            "created_date": "2024-07-29",
            "updated_time": "2024-07-29"
        },{
            "host_user_idx": 1,
            "apply_user_idx": 3,
            "request_idx":3,
            "trade_amount": 3500,
            "created_date": "2024-10-29",
            "updated_time": "2024-10-29"
        },{
            "host_user_idx": 2,
            "apply_user_idx": 4,
            "request_idx":4,
            "trade_amount": 2800,
            "created_date": "2024-11-12",
            "updated_time": "2024-11-12"
        },{
            "host_user_idx": 5,
            "apply_user_idx": 3,
            "request_idx":5,
            "trade_amount": 1600,
            "created_date": "2024-11-15",
            "updated_time": "2024-11-15"
        },
    ]);
    for(const thing of history){
        await esClient.index({
            index: 'request_info',
            id: thing.request_idx,
            body: thing
        });
    }
    return history;
}

module.exports = insertCreditHistory;