let dbUtli = require('../utilities/dbUtli');

module.exports = {

	getRoles: async () => {
		let sql = "SELECT * FROM role";
		let param = [];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return fields;
		});
	},
	setRoles: async (role) => {
		let sql = "INSERT INTO role(roleId, name, viewReport, canCreateJob, assignJob)" +
			"Value(?,?,?,?,?)";
		let param = [role.roleId, role.name, role.viewReport, role.canCreateJob, role.assignJob];
		return await dbUtli.executeSql(sql, param).then(fields => {
			return true;
		});
	},
	getRole: async (roleId) => {
		let sql = "SELECT * FROM role WHERE roleId = roleId";
		let param = [roleId];
		return await dbUtli.executeSql(sql, param).then(fields => {
			return fields;
		});
	},
	updateRole: async (role) => {
		let sql = "UPDATE role SET roleName = ?, canViewReport = ? , canCreateEmployee = ?, canCreateJob = ? , canAssginJob =? " +
			"WHERE roleId = ?)"

		let param = [role.roleName, role.canViewReport, role.canCreateEmployee, role.canAssginJob, role.canCreateJob, role.roleId];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return true;
		});
	},
	deleteRole: async (roleId) => {
		let sql = "DELETE FROM roleId =?"
		let param = [roleId];
		return await dbUtli.executeSql(sql, param).then(fields => {
			return fields;
		});
	}
}