import { createStore } from 'vuex'
import user from './user'
import permission from './async-router'
import tags from './tags'

export default createStore({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		user,
		permission,
		tags
	},
})
