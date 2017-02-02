module.exports = {
	node: function isNode(node) {
		return node && node.nodeName && node.nodeType > 0 && node.cloneNode
	},
	function: function isFunction(fcn) {
		return fcn && fcn.constructor === Function
	},
	string: function isString(str) { //ignores the empty string
		return str && str.constructor === String
	},
	object: function isObject(obj) {
		return obj && ((obj.constructor === Object) || (!obj.constructor && typeof obj === 'object'))
	},
	stringlike: function stringLike(val) { //ignores the empty string
		return val ? (val.constructor === String || val.constructor === Number) : val === 0
	}
}
