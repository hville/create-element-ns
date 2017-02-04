var dom = require('dom-document'),
		cTyp = require('./typ')

module.exports = setChildren

function setChildren(e, c) {
	if (c.length === 1) switch (cTyp(c[0])) {
		case Number: case String: return e.textContent = c[0]
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
	switch (cTyp(itm)) {
		case 'N':
			return itm.cloneNode(true)
		case Function:
			return itm()
		case Number:
			return dom.document.createTextNode(itm)
		case String: //skip empty string
			if (itm) return dom.document.createTextNode(itm)
	}
}
