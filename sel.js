var markers = {
	tag: {
		'#': {m: 'v', f: setId, x: 'tag'},
		'.': {m: 'v', f: appendClass, x: 'tag'},
		'[': {m: 'k', k: '', f: setAttribute, x: 'key'},
	},
	key: {
		'=': {m: 'v', x: 'val'},
		']': {x: 'tag'}
	},
	val: {
		'"': {},
		']': {x: 'tag'}
	}
}

module.exports = function parseSel(sel) {
	var res = {tagName: '', attributes: {}}
	var ctx = {
		c: markers.tag,
		m: 'v',
		v: '',
		f: setTN
	}
	for (var i=0; i<sel.length; ++i) {
		var act = ctx.c[sel[i]]
		if (act) {
			if(act.f) { // callback and reset
				ctx.f(res, ctx)
				ctx.k = act.k
				ctx.f = act.f
				ctx.v = ''
			}
			if (act.m) ctx.m = act.m
			if (act.x) ctx.c = markers[act.x]
		}
		else ctx[ctx.m] += sel[i]
	}
	ctx.f(res, ctx)
	return checkTagNS(res)
}
function setId(res, ctx) {
	res.attributes.id = ctx.v
}
function setTN(res, ctx) {
	res.tagName = ctx.v
}
function setAttribute(res, ctx) {
	if (ctx.k === 'xmlns') res.xmlns = ctx.v
	else res.attributes[ctx.k] = ctx.v || true
}
function appendClass(res, ctx) {
	var att = res.attributes
	if (ctx.v) {
		if (att.class) att.class += ' ' + ctx.v
		else att.class = ctx.v
	}
}
function checkTagNS(res) {
	var tagIndex = res.tagName.indexOf(':')
	if (tagIndex >= 0) {
		res.prefix = res.tagName.slice(0, tagIndex)
		res.tagName = res.tagName.slice(tagIndex+1)
	}
	return res
}
