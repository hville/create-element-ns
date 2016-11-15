var decorators = require('./decorators')

module.exports = decorate

function decorate(el, cfg) {
	for (var k in cfg) {
		if (decorators[k]) decorators[k](el, k, cfg[k])
	}
	return el
}
