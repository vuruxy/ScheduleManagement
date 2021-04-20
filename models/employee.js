const e = require("express");
const express = require("express");
var dbUtli = require('../utilities/dbUtli');

module.exports = {
	isLogIn: (user) => {
		if (typeof user == "object") {
			return true;
		} else {
			return false;
		}
	},
	isAuthenticate: async (username, password) => {
		return await _employeeHelper.isAuthenticate(username, password);
	},
	setLogIn: async (session, username) => {
		return await _employeeHelper.setLogIn(session, username);
	},
	setLogOut: (session) => {
		session.destroy();
	},
	getEmployeeById: async (employeeId) => {
		return await _employeeHelper.getEmployeeById(employeeId);
	},
	setEmployee: async (employee) => {
		return await _employeeHelper.setEmployee(employee)
	},
	getEmployees: async () => {
		return await _employeeHelper.getEmployees();
	},
	getEmployee: async (username) => {
		return await _employeeHelper.getEmployee(username);
	},
	deleteEmployee: async (employeeId) => {
		return await _employeeHelper.deleteEmployee(employeeId);
	}
};
class employeeHelper {
	async getEmployees() {
		let sql =
			"SELECT * FROM Employee INNER JOIN Role ON Role.RoleID = Employee.RoleID";

		return await dbUtli.executeSql(sql, []).then((fields) => {
			return fields;
		});
	}
	async getEmployee(username) {
		let sql = "SELECT * FROM employee INNER JOIN role on role.roleId  = emoployee.roleId WHERE username = ?";
		let param = [username];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return fields && fields[0] ? fields[0] : null;
		});
	}
	async setLogIn(session, username) {
		let sql = "SELECT * FROM employee INNER JOIN role ON role.roleId = employee.roleId WHERE username = ?";
		let param = [username];

		await dbUtli.executeSql(sql, param).then(fields => {
			session.user = fields && fields[0] ? fields[0] : null;
		});
	}
	async setEmployee(employee) {
		let sql = "INSERT INTO employee (name, phone, address, roleId, username, password)" +
			"VALUES (?,?,?,?,?,?)";
		let param = [employee.name, employee.phone, employee.address, employee.roleId, employee.username, employee.password];

		return await dbUtli.executeSql(sql, param).then(fields => {
			console.log(employee);
			return true;
		});
	}
	async updateEmployee(employee) {
		let sql = "UPDATE employee SET name = ?, phone = ? , address = ? , roleId = ?, username =? " +
			"password =? WHERE username= ?)"
		let param = [employee.name, employee.phone, employee.address, employee.roleId, employee.username, employee.password];

		return await dbUtli.executeSql(sql, param).then(fileds => {
			return true;
		});
	}
	async deleteEmployee(employeeId) {
		let sql = "DELETE employe WHERE employeeId = ? "
		let param = [employeeId];
		return await dbUtli.executeSql(sql, param).then(fields => {
			return true;
		});
	}
	async isAuthenticate(username, password) {
		let sql = "SELECT * FROM employee WHERE username =? AND password =?";
		let param = [username, password];

		return await dbUtli.executeSql(sql, param).then(fields => {
			if (fields.length > 0) {
				return true;
			} else
				return false;
		});
	}
	async getEmployeeById(employeeId) {
		let sql = "SELECT * FROM employee INNER JOIN role ON role.roleID = employee.employeeId WHERE employeeID =? ";
		let param = [employeeId];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return true;
		});
	}
}
const _employeeHelper = new employeeHelper();
