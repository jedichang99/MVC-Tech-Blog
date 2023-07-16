const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../../config/connection")[env];

const db = {};

db.Sequelize = Sequelize;
// db.sequelize = sequelize;

db.User = require("./user");
db.Post = require("./post");

// Define associations
db.User.hasMany(db.Post, { foreignKey: "user_id" });
db.Post.belongsTo(db.User, { foreignKey: "user_id" });

module.exports = db;
