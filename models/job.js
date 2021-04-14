const dbUtli = require('../utilities/dbUtli');
var dbUtli = require('../utilities/dbUtli');

module.exports = {
	getJobByEmployeeId: async (employeeId) => {
		return await _jobHelper.getJobByEmployeeId(employeeId);
	},
	getUnAssignJobs: async () => {
		return await _jobHelper.getUnAssignJobs();
	},
	getJobs: async (jobId) => {
		return await _jobHelper.getJobs(jobId);
	},
	getJobById: async () => {
		return await _jobHelper.getJobs();
	},
	setJobs: async (job) => {
		return await _jobHelper.setJobs(job);
	},
	updatejob: async (job) => {
		return await _jobHelper.updatejob(job);
	},
	deletejob: async (jobId) => {
		return await _jobHelper.deleteJob(jobId);
	}
}

class jobHelper {
	async getJobs() {
		let sql = "SELECT * FROM job";

		return await dbUtli.executeSql(sql, []).then(fields => {
			return fields;
		});
	}
	async getUnAssignJobs() {
		let sql = "SELECT job.jobId, jobName, startDate, endDate FROM job LEFT JOIN schedule.jobId = job.jobId WHERE employeeId is NULL";

		return await dbUtli.executeSql(sql, []).then(fields => {
			return fields;
		});
	}
	async getJobById(jobId) {
		let sql = "SELECT * FROM job WHERE jobId = ?";

		let param = [jobId];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return fields;
		});
	}
	async getJobByEmployeeId(employeeId) {
		let sql = "SELECT * FROM job INNER JOIN assign ON assign.jobId = job.jodId" +
			"INNER JOIN employee on employee.employeeId = assign.employeeId" +
			" WHERE employee.employeeId =? "

		let param = [employeeId];
		return await dbUtli.executeSql(sql, param).then(fields => {
			return fields && fields[0] ? fields[0] : null;
		});
	}
	async setJob(job) {
		let sql = "INSERT INTO job (jobName, startDate, endDate) VALUE (?,?,?)";
		let param = [job.jobName, job.startDate, job.endDate];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return true;
		});
	}
	async deleteJob(jobId) {
		let sql = "DELETE job FROM job WHERE jobId = ? ";
		let param = [jobId];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return true;
		});
	}
}
const _jobHelper = new jobHelper();