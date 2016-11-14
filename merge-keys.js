var is = require('./is')

// shallow clone - 2 levels - to merge attributes, properties, elements and other options
module.exports = mergeKeys

function mergeKeys(tgt) {
	for (var i=1; i<arguments.length; ++i) {
		var arg = arguments[i]
		if(is.object(arg)) mergePair(tgt, arg)
	}
	return tgt
}
function mergePair(t, s) {
	for (var i=0, ks=Object.keys(s); i<ks.length; ++i) {
		var k = ks[i],
				v = s[k]
		t[k] = Array.isArray(v) ? flatConcat(t[k] || [], v)
			: v.cloneNode ? v.cloneNode(true)
			: v.clone ? v.clone()
			: is.object(v) ? Object.assign(t[k] || {}, v)
			: v
	}
	return t
}
function flatConcat(arr, val) {
	if (Array.isArray(val)) for (var i=0; i<val.length; ++i) flatConcat(arr, val[i])
	else arr.push(val)
	return arr
}
