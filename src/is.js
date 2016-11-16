module.exports = {
	node: isNode,
	function: isFunction,
	string: isString,
	object: isObject,
	stringlike: stringLike
}
function isNode(node) {
	return node && node.nodeName && node.nodeType > 0
}
function isObject(obj) {
	return obj && ((obj.constructor === Object) || (!obj.constructor && typeof obj === 'object'))
}
function isString(str) {
	return str && str.constructor === String
}
function stringLike(val) {
	return (val && (val.constructor === String || val.constructor === Number)) || val === 0
}
function isFunction(fcn) {
	return fcn && fcn.constructor === Function
}
