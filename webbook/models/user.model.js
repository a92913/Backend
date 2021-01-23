//tabela utilizadores
module.exports = function(sequelize, Sequelize) {
	let User = sequelize.define('user', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
		email: { type: Sequelize.STRING, validate: { isEmail: true } },
		password: { type: Sequelize.STRING, allowNull: false },
		profile: { type: Sequelize.STRING, notEmpty: true },
		status: { type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active' },
		
	});
	return User;
}
