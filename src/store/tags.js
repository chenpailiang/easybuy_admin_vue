// 标签栏
const tags = {
	namespaced: true,
	state: {
		views: [{ title: '首页', path: '/index/index' }],
	},
	mutations: {
		addViews: (state, v) => {
			if (state.views.some(u => u.path == v.path)) return
			state.views.push(v)
		},
		delViews: (state, v) => {
			let i = state.views.findIndex(u => u.path == v.path)
			state.views.splice(i, 1)
		},
	},
}
export default tags
