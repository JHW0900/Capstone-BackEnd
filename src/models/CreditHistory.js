const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('@src/config/database');

const CreditHistory = sequelize.define('TB_CREDIT_HISTORY', {
    credit_trade_idx:{  //credit 거래 내역 KEY
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    host_user_idx: {  //의뢰공고 유저 고유 KEY(고용자)
        type: DataTypes.INTEGER,
        allowNull: false
    },
    apply_user_idx: {  //지원한 유저 고유 KEY(피고용자)
        type: DataTypes.INTEGER,
        allowNull: false
    },
    request_idx: {  //credit 거래가 발생한 의뢰 고유 KEY
        type: DataTypes.INTEGER,
        allowNull: false
    },
    trade_amount: {  //거래한 Credit 양
        type: DataTypes.INTEGER,
        defaultValue:0,
    },
    trade_time: {  //Credit 거래 시간
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_time: {  //수정 시간
        type: DataTypes.DATE,
    },
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = CreditHistory;