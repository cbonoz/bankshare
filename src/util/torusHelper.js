import Web3 from 'web3'
import Torus from '@toruslabs/torus-embed';

const web3Obj = {
	web3: new Web3(),
	torus: new Torus(),
	userInfo: {},
  setweb3: function(provider) {
    const web3Inst = new Web3(provider)
    web3Obj.web3 = web3Inst
    sessionStorage.setItem('pageUsingTorus', true)
	},
	hasweb3: function() {
		return !!web3Obj.web3
	},
  initialize: async function() {
		const torus = web3Obj.torus
		try {
			await torus.init()
		} catch (e) {
			console.error(e)
		}

		try {
			await torus.login()
		} catch (e) {
			console.error(e)
		}

    web3Obj.setweb3(torus.provider)
	},
	setUserInfo: function(userInfo) {
		web3Obj.userInfo = userInfo
	},
	logout: async function( ) {
		const torus = web3Obj.torus
		return await torus.logout()
	}
}
export default web3Obj;