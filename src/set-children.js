var dom = require('dom-document'),
		is = require('./is')

module.exports = setChildren

function setChildren(e, c) { // some parts from https://github.com/pakastin/redom
	if (c.length === 1 && is.stringlike(c[0])) e.textContent = c[0]
	else {
		var ptr = e.firstChild
		for (var i=0; i<c.length; ++i) {
			var itm = c[i]
			var node = is.node(itm) ? itm.cloneNode(true)
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
