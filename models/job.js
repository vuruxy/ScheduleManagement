const dbUtli = require('../utilities/dbUtli');

module.exports = {
	getJobByEmployeeId: async (employeeId, startDate, endDate) => {
		return await _jobHelper.getJobByEmployeeId(employeeId, startDate, endDate);
	},
	getUnAssignJobs: async () => {
		return await _jobHelper.getUnAssignJobs();
	},
	getJobs: async () => {
		return await _jobHelper.getJobs();
	},
	getJobById: async (jobId) => {
		return await _jobHelper.getJobById(jobId);
	},
	setJobs: async (job) => {
		return await _jobHelper.setJob(job);
	},
	updateJob: async (job) => {
		return await _jobHelper.updateJob(job);
	},
	deleteJob: async (jobId) => {
		return await _jobHelper.deleteJob(jobId);
	},
	assignJob: async(employeeId, jobId) => {
		return await _jobHelper.assignJob(employeeId, jobId)
	},
	doneJob: async(jobId, isDone) => {
		return await _jobHelper.doneJob(jobId, isDone)
	},
	getAssignJobByEmployeeId: async(employeeId, startDate, endDate) => {
		return await _jobHelper.getAssignJobByEmployeeId(employeeId, startDate, endDate)
	},
	getJobByJobId: async(jobId) => {
		return await _jobHelper.getJobByJobId(jobId);
	},
	getJobReport: async() => {
		return await _jobHelper.getJobReport();
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
		let sql = "SELECT job.jobId, jobName, startDate, endDate FROM job LEFT JOIN assign ON assign.jobId = job.jobId WHERE assign.employeeId is NULL;";

		return await dbUtli.executeSql(sql, []).then(fields => {
			return fields;
		});
	}
	async getJobById(jobId) {
		let sql = "SELECT * FROM job WHERE jobId = ?";

		let param = [jobId];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return fields && fields[0] ? fields[0] : null;
		});
	}
	async getJobByEmployeeId(employeeId) {
		let sql = "SELECT * FROM job INNER JOIN assign ON assign.jobId = job.jobId " +
			"INNER JOIN employee on employee.employeeId = assign.employeeId" +
			" WHERE employee.employeeId =? "
		let param = [employeeId];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return fields ? fields : null;
		});
	}
	async getAssignJobByEmployeeId(employeeId, startDate, endDate) {
		let sql = "SELECT * FROM job INNER JOIN assign ON assign.jobId = job.jobId " +
			"INNER JOIN employee on employee.employeeId = assign.employeeId" +
			" WHERE employee.employeeId = ? AND startDate >= ? AND endDate <= ?"
		let param = [employeeId, startDate, endDate];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return fields ? fields : null;
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
	async updateJob(job) {
		let sql = "UPDATE job SET jobName = ?, startDate = ?, endDate = ?" +
			" WHERE jobId = ?"
		let param = [job.jobName, job.startDate, job.endDate, job.jobId];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return true;
		});
	}
	async assignJob(employeeId, jobId) {
		let sql = "INSERT INTO assign(employeeId, jobId, isDone) VALUES(?, ?, ?)"
		let param = [employeeId, jobId, '0'];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return true;
		});
	}
	async doneJob(jobId, isDone) {
		let sql = "UPDATE assign SET isDone = ? WHERE jobId = ?"
		let param = [isDone, jobId];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return true;
		});
	}
	async getJobByJobId(jobId) {
		let sql = "SELECT name, jobName, startDate, endDate, isDone, job.jobId FROM job INNER JOIN assign ON assign.jobId = job.jobId INNER JOIN employee on employee.employeeId = assign.employeeId WHERE job.jobId = ?"
		let param = [jobId];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return fields && fields[0] ? fields[0] : null;
		});
	}
	async getJobReport() {
		let sql = "SELECT employee.employeeId, name, COUNT(finishedAssign.assignId) as finishCount, COUNT(unfinishedAssign.assignId) as unfinishCount FROM employee LEFT JOIN assign AS finishedAssign ON finishedAssign.employeeId = employee.employeeId AND finishedAssign.isDone = '1' LEFT JOIN assign AS unfinishedAssign ON unfinishedAssign.employeeId = employee.employeeId AND unfinishedAssign.isDone = '0' GROUP BY employee.employeeId, name;"
		let param = [];

		return await dbUtli.executeSql(sql, param).then(fields => {
			return fields;
		});
	}
}
const _jobHelper = new jobHelper();