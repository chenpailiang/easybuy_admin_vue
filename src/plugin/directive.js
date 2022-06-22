export default {
	install(app) {
		app.directive('auth', {
			mounted(el, binding) {
				try {
					let vm = binding.instance.$root
					let menuId = vm.$route.meta.menuId
					if (!menuId) return
					let funcs = vm.$store.getters['user/permissions'].funcs.filter(
						v => v.menuId == menuId
					)
					let func = funcs.find(v => v.symbol.toLowerCase() == binding.arg.toLowerCase())
					if (!func) {
						el.parentNode && el.parentNode.removeChild(el)
						return
					}
					el.localName == 'button' && (el.innerText = func.name)
				} catch (error) {}
			},
		})
	},
}
