var dom = require('dom-document'),
		typ = require('./typ')

module.exports = setChildren

function setChildren(e, c) {
	if (c.length === 1) switch (typ(c[0])) {
		case typ.N: case typ.S: return e.textContent = c[0]
	}

	var ptr = e.firstChild
	for (var i=0; i<c.length; ++i) {
		var node = getNode(c[i])
		if (node && node !== ptr) e.appendChild(node, ptr)
	}
	while (ptr) {
		var next = ptr.nextSibling
		e.removeChild(ptr)
		ptr = next
	}
}
function getNode(itm) {
	switch (typ(itm)) {
		case typ.E:
			return itm.cloneNode(true)
		case typ.F:
			return itm()
		case typ.N:
			return dom.document.createTextNode(itm)
		case typ.S: //skip empty string
			if (itm) return dom.document.createTextNode(itm)
	}
}
