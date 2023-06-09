const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username:String,
    password:String,
},{
    collection:'accounts'
});

const AccountModel = mongoose.model('accounts', accountSchema);
module.exports = AccountModel
