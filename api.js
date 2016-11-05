var is = require('./is')

var decorators = {
	a: setAttributes,
	attrs: setAttributes,
	attributes: setAttributes,
	p: setProperties,
	props: setProperties,
	properties: setProperties,
	children: setChildren,
	dataset: setObj,
	style: setStyle,
	s: setStyle,
}
var api = {
	document: typeof document !== 'undefined' ? document : null,
	namespaces: {
		svg : 'http://www.w3.org/2000/svg'
	},
	decorators: decorators
}

module.exports = api

// setters
function setChildren(e, k, v) {
	for (var i=0; i<v.length; ++i) {
		var itm = v[i]
		var node = is.node(itm) ? itm
			: is.stringlike(itm) ? api.document.createTextNode(itm)
			: is.node(itm) ? itm
			: null
		if (node) e.appendChild(node)
	}
}
function setObj(e, k, o) {
	for (var ki in o) e[k][ki] = o[ki]
}
function setStyle(e, k, v) {
	if (e.namespaceURI) e.setAttribute(k, styleString(v))
	else if (typeof v === 'object') setObj(e, k, v)
	else e[k].cssText = v
}
function styleString(s) {
	return is.object(s) ? Object.keys(s).map(styleToString, s).join(';') : s
}
function styleToString(k) {
	return k + ':' + this[k]
}
function setAttribute(e, k, v) {
	var cIdx = k.indexOf(':')
	if (cIdx >= 0) {
		var ns = k.slice(0, cIdx),
				ln = k.slice(cIdx+1)
		if (v === false) e.removeAttributeNS(ns, ln)
		else e.setAttributeNS(ns, ln, v === true ? '' : v)
	}
	else {
		if (v === false) e.removeAttribute(k)
		else e.setAttribute(k, v === true ? '' : v)
	}
}
function setProperties(e, k, o) {
	for (var ki in o) e[ki] = o[ki]
}
function setAttributes(e, k, o) {
	for (var ki in o) setAttribute(e, ki, o[ki])
}
