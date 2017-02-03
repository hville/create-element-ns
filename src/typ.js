module.exports = function cType(t) { //eslint-disable-next-line eqeqeq
	return t == null ? t
	: (t.nodeName && t.nodeType > 0 && t.cloneNode) ? 'N'
	: t.constructor || Object
}
