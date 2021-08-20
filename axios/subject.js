import https from './interface'

export const getSubjectList = (data) => {
	return https({
		url: '/subject/all',
		method: 'GET', // 默认POST
		data,
		// handle:true
	})
}