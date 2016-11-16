var decorators = require('./decorators')

module.exports = decorate

function decorate(el, cfg) {
	for (var k in decorators) {
		if (cfg[k]) decorators[k](el, k, cfg[k])
	}
	return el
}
