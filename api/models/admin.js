const Schema = require('mongoose').Schema;
const ObjectId = Schema.Types.ObjectId;

const AdminSchema = new Schema({
  username: { type: String },
  passowrd: { type: String }
});

module.exports = AdminSchema;