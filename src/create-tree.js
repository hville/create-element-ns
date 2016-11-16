var decorate = require('./decorate'),
		setChildren = require('./set-children'),
		createElement = require('./create-element')

module.exports = createTree

function createTree(cfg, arg) {
	var el = createElement(cfg)
	decorate(el, cfg)
	if (cfg.content) setChildren(el, cfg.content)
	return arg ? decorate(el, arg) : el
}
