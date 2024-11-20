const UserCreditInfo = require('@src/models/UserCreditInfo');
const esClient = require('@src/config/esClient');

const insertUserCreditInfo = async () => {
    const credits = await UserCreditInfo.bulkCreate([
        {
            "user_idx": 1,
            "credit_amount": 200
        },{
            "user_idx": 2,
            "credit_amount": 1500
        },{
            "user_idx": 3,
            "credit_amount": 870
        },{
            "user_idx": 4,
            "credit_amount": 560
        },{
            "user_idx": 5,
            "credit_amount": 90
        },
    ]);
    for(const credit of credits){
        await esClient.index({
            index: 'user_credit_info',
            id: credit.user_idx,
            body: credit
        });
    }
    return credits;
}

module.exports = insertUserCreditInfo;