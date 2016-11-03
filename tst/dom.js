var jsdom = require('jsdom').jsdom,
		ct = require('cotest'),
		main = require('../index')

var htm = main.html.el,
		svg = main.svg.el,
		DOM = jsdom().defaultView

main.api(DOM.document)

ct('html', function() {
	var el = htm('div')
	ct('===', el.nodeName.toLowerCase(), 'div')
	ct('!!', el instanceof DOM.Node)
})
ct('svg', function() {
	var el = svg('svg')
	ct('===', el.nodeName, 'svg')
	ct('!!', el instanceof DOM.Node)
})
ct('svg attributes', function() {
	var el = svg('svg', svg('path[d=mypath]'))
	ct('===', el.nodeName, 'svg')
	ct('!!', el instanceof DOM.Node)
	ct('===', el.firstChild.nodeName, 'path')
})
ct('html text nodes', function() {
	var el = htm('div', 'one', [2, 'three'])
	ct('===', el.childNodes.length, 3)
	ct('===', el.children.length, 0)
})
ct('html text content', function() {
	var el = htm('div', [2])
	ct('===', el.textContent, '2')
	ct('===', el.children.length, 0)
})
ct('mixed nested namespace', function() {
	var el = htm('div', svg('svg'), htm('p', 'text'))
	ct('===', el.childNodes.length, 2)
	ct('===', el.children.length, 2)
})
ct('selectors', function() {
	var el = htm('.c1#i1[style="color:blue"].c2')
	ct('===', el.nodeName, 'DIV')
	ct('===', el.id, 'i1')
	ct('===', el.className, 'c1 c2')
	ct('===', el.style.color, 'blue')
	ct('===', el.getAttribute('style'), 'color: blue;')
})
ct('decorators', function() {
	var handler = function(){},
			el = htm('div', {className: 'c1 c2', id: 'i1', style:{color: 'blue'}, onclick: handler})
	ct('===', el.nodeName, 'DIV')
	ct('===', el.id, 'i1')
	ct('===', el.className, 'c1 c2')
	ct('===', el.style.color, 'blue')
	ct('===', el.getAttribute('style'), 'color: blue;')
	ct('===', el.onclick.constructor, Function)
})
ct('element namespace', function() {
	var el0 = svg('circle'),
			el1 = htm('svg:circle'),
			el2 = htm('circle[xmlns="http://www.w3.org/2000/svg"]')
	ct('===', el0.namespaceURI, 'http://www.w3.org/2000/svg')
	ct('===', el1.namespaceURI, 'http://www.w3.org/2000/svg')
	ct('===', el2.namespaceURI, 'http://www.w3.org/2000/svg')
})
ct('attribute namespace', function() {
	var el0 = svg('circle[xmlns:xlink="http://www.w3.org/1999/xlink"]'),
			el1 = svg('circle[xmlns:xlink="http://www.w3.org/1999/xlink"]'),
			el2 = htm('circle', {'xmlns:xlink':'http://www.w3.org/2000/svg'})
	ct('===', el0.hasAttributeNS('xmlns','xlink'), true)
	ct('===', el1.hasAttributeNS('xmlns','xlink'), true)
	ct('===', el2.hasAttributeNS('xmlns','xlink'), true)
})
ct('attribute namespace', function() {
	var fac = main.html.fn,
			el0 = fac('div')
	function dec(el) {
		el.textContent = 'x'
		return el
	}
	ct('===', el0(dec).textContent, 'x')
	ct('===', el0({textContent: 'y'}).textContent, 'y')
})
ct('forced properties and attributes', function() {
	var ela = htm('div', {
		attributes:{class: 'c', tabIndex: 2}
	})
	var elp = htm('div', {
		properties:{className: 'c', tabIndex: 2}
	})
	ct('===', ela.tabIndex, 2)
	ct('===', elp.tabIndex, 2)
	ct('===', ela.getAttribute('tabIndex'), '2')
	ct('===', elp.getAttribute('tabIndex'), '2')
	ct('===', ela.className, 'c')
	ct('===', elp.className, 'c')
	ct('===', ela.getAttribute('class'), 'c')
	ct('===', elp.getAttribute('class'), 'c')
})
