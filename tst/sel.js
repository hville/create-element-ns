var ct = require('cotest')
var sel = require('../sel')

ct('single tag', function(){
	ct('{==}', sel('div'), {tagName: 'div', attributes: {}})
	ct('{==}', sel(''), {tagName: '', attributes: {}})
})
ct('mixed classes and id', function(){
	ct('{==}', sel('.c1#i1.c2'), {tagName: '', attributes: {id: 'i1', class: 'c1 c2'}})
	ct('{==}', sel('div#i1.c1.c2'), {tagName: 'div', attributes: {id: 'i1', class: 'c1 c2'}})
	ct('{==}', sel('div.c1.c2#i1'), {tagName: 'div', attributes: {id: 'i1', class: 'c1 c2'}})
	ct('{==}', sel('..##..##'), {tagName: '', attributes: {id: ''}})
})
ct('mixed classes and id as attributes', function(){
	ct('{==}', sel('.c1#i1.c2[id=i2][class=c3]'), {tagName: '', attributes: {id: 'i2', class: 'c3'}})
	ct('{==}', sel('.c1#i1.c2[id="i2"][class="c3"]'), {tagName: '', attributes: {id: 'i2', class: 'c3'}})
	ct('{==}', sel('div#i1[class=c3].c1.c2'), {tagName: 'div', attributes: {id: 'i1', class: 'c3 c1 c2'}})
	ct('{==}', sel('div#i1[class="c3"].c1.c2'), {tagName: 'div', attributes: {id: 'i1', class: 'c3 c1 c2'}})
})
ct('tag namespace prefix', function(){
	ct('{==}', sel('svg:circle'), {prefix: 'svg', tagName: 'circle', attributes: {}})
})
ct('markers in attribute values', function() {
	ct('{==}', sel('[a=b.c]').attributes.a, 'b.c')
	ct('{==}', sel('[a:b=c]').attributes['a:b'], 'c')
	ct('{==}', sel('[a:b=c.d]').attributes['a:b'], 'c.d')
})
