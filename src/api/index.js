const axios = require('axios')
const https = require('https')

const TAXA_KEY = process.env.REACT_APP_TAXA_KEY
if (!TAXA_KEY) {
	console.error('TAXA_KEY must be defined')
}

const SERVER_PORT = 8002
export const BASE_URL = `http://13.82.190.26:${SERVER_PORT}` // Taxa node.
export const CONTRACT_URL = `${BASE_URL}/api/contract/start`
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


const instance = axios.create({
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
})

// example reequest.
// {
// 	"publicKey":"75 c9 ee 56 bd 04 d1 69 31 62 57 a7 84 7b 0e db 0d 26 4d 1e 2d 36 0f 36 4c 56 5b 85 7b cd 75 59 4f 9c 54 b4 06 77 e5 6a 67 87 d6 fa cc e8 42 3d 72 9f 1e 69 c2 3c fa be c9 aa 85 7a 49 c0 aa d4",
// "contractName":"testSha256",
// "methodName":"methodB",
// "data": "abcd",
// "params": {"a":"3"},
// "header": {"user" : "text"},
// "contentTransferEncoding": "raw",
// "code" : ""
// }


export const startContract = (contractName, methodName, data, params, header) => {
	let body = {
		publicKey: TAXA_KEY,
		contractName,
		methodName,
		data,
		params: params || {a: "3"},
		header: header || {user: "text"},
		contentTransferEncoding: "raw",
		code : ""
	}
	body = JSON.stringify(body)
	console.log('body', body)
	return instance.post(CONTRACT_URL, body)
}