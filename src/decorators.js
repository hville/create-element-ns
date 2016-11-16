var dom = require('dom-document'),
		is = require('./is')

var decorators = {
	attributes: setAttributes, attrs: setAttributes,
	properties: setProperties, props: setProperties,
	style: setStyle,
	dataset: setObj,
	content: setChildren,
}

module.exports = decorators

// setters
function setChildren(e, k, v) { // inspired in parts from REDOM
	if (v.length === 1 && is.stringlike(v[0]) && !e.childNodes.length) e.textContent = v[0]
	else {
		var ptr = e.firstChild
		for (var i=0; i<v.length; ++i) {
			var itm = v[i]
			var node = is.node(itm) ? itm
				: is.stringlike(itm) ? dom.document.createTextNode(itm)
				: is.function(itm) ? itm()
				: null
			if (node && node !== ptr) e.appendChild(node, ptr)
		}
		while (ptr) {
			var next = ptr.nextSibling
			e.removeChild(ptr)
			ptr = next
		}
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
