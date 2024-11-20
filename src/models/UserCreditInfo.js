const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('@src/config/database');

const UserCreditInfo = sequelize.define('TB_USER_CREDIT_INFO', {
    user_idx:{  //유저 고유 KEY
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    credit_amount:{  //유저가 소유한 credit 양
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = UserCreditInfo;