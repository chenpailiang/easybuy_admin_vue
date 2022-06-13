export function timeFix () {
	const time = new Date()
	const hour = time.getHours()
	return hour < 9
		? '早上好'
		: hour <= 11
		? '上午好'
		: hour <= 13
		? '中午好'
		: hour < 20
		? '下午好'
		: '晚上好'
}

// menu渲染成tree
export function listToTree (list, tree, parentId) {
	list.forEach(item => {
		// 判断是否为父级菜单
		if (item.parentId === parentId) {
			const child = { ...item, children: [] }
			// 迭代 list， 找到当前菜单相符合的所有子菜单
			listToTree(list, child.children, item.id)
			// 删掉不存在 children 值的属性
			if (child.children.length <= 0)	delete child.children		
			// 加入到树中
			tree.push(child)
		}
	})
}
