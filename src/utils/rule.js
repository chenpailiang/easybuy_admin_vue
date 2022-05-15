//手机号校验
export function phoneCheck(rule, value, callback) {
	let reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
	if (!value) return callback(new Error('请输入手机号码'))
	else if (!reg.test(value)) return callback(new Error('手机号格式有误'))
	else callback()
}
