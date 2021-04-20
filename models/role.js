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
		let sql = "INSERT INTO role (roleName, canViewReport, canCreateEmployee, canAssginJob," +
				  "canCreateJob) VALUES (?,?,?,?,?)";
		let param = [role.roleName, role.canViewReport, role.canCreateEmployee, 
					 role.canAssginJob, role.canCreateJob];
		return await dbUtli.executeSql(sql, param).then(fields => {
			return true;
		});
	},
	getRole: async (roleId) => {
		let sql = "SELECT * FROM role WHERE roleId = ?";
		let param = [roleId];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return fields && fields[0] ? fields[0] : null;
		});
	},
	updateRole: async (role) => {
		let sql = "UPDATE role SET roleName = ?, canViewReport = ? , canCreateEmployee = ?, canCreateJob = ? , canAssginJob = ? " +
			"WHERE roleId = ?"

		let param = [role.roleName, role.canViewReport, role.canCreateEmployee, role.canAssginJob, role.canCreateJob, role.roleId];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return true;
		});
	},
	deleteRole: async (roleId) => {
		let sql = "DELETE FROM role WHERE roleId = ?"
		let param = [roleId];
		return await dbUtli.executeSql(sql, param).then(fields => {
			return fields;
		});
	}
}