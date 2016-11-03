var is = require('./is')

var elementDecorators = {
	//default
	'': setOther,
	// node API
	children: setChildren,
	//nodeName: null,
	textContent: setProp,
	// element API
	className: setProp,
	id: setProp,
	innerHTML: setProp,
	tagName: null,
	xmlns: null,
	//convenience non-standard items to either force properties or attributes
	attributes: setAttributes,
	properties: setProperties,
}
var htmlDecorators = {
	contentEditable: setProp,
	dataset: setObj,
	style: setStyle,
	tabIndex: setProp
}
var svgDecorators = {
	id: null, // read only property, revert to defaults with attributes
}
var api = {
	document: typeof document !== 'undefined' ? document : null,
	namespaces: {
		svg : 'http://www.w3.org/2000/svg'
	},
	decorators: {
		element: elementDecorators,
		html: defaults(htmlDecorators, elementDecorators),
		svg: defaults(svgDecorators, elementDecorators),
	}
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
function setProp(e, k, v) {
	e[k] = v
}
function setObj(e, k, o) {
	for (var ki in o) e[k][ki] = o[ki]
}
function setStyle(e, k, v) {
	if (typeof v === 'object') setObj(e, k, v)
	else e[k].cssText = v
}
function setOther(e, k, v) {
	if (k[0] === 'o' && k[1] === 'n' && is.function(v)) e[k] = v
	else setAttribute(e, k, v)
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
// utils
function defaults(t, s) {
	for (var k in s) if (t[k] === undefined) t[k] = s[k]
	return t
}
