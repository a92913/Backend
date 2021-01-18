module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define('user', {
        id_login: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        profile: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        email: {
            type: Sequelize.STRING,
             validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return User;
};