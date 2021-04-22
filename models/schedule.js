const dbUtli = require("../utilities/dbUtli");
module.exports = {
	getJobByEmployeeId: async (employeeId) => {
		return await _scheduleHelper.getJobByEmployeeId(employeeId);
	}
}
class scheduleHelper {
	//getJobByEmployeeId
	//join employee table, assign table, job table where by employeeid
	async getJobByEmployeeId(employeeId) {

		let sql = "SELECT * FROM job INNER JOIN assign ON assgin.jobId = job.jobId" +
			" INNER JOIN employee ON employee.employeeId = assgin.employeeId" +
			" WHERE employee.employeeId = ?";
		let param = [employeeId];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return fields;
		});
	}
	//getJobs
	//select job table but jobId dosen't have in asign table
	async getJobs() {
		let sql = "SELECT * FROM unAssginJob FROM job";

		return await dbUtli.executeSql(sql, []).then(fields => {
			return fields;
		});
	}



	//getEmployees
	//all employee in employee table
	async getEmployees() {
		let sql = "SELECT * FROM Employee GET employee.employees";

		return await dbUtli.executeSql(sql, []).then((fields) => {
			return fields;
		});
	}
}
const _scheduleHelper = new scheduleHelper();
