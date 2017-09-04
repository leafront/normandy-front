
var router = require('koa-router')();

var common = require('../../model/common');

var baseModel = require('../../model/baseModel');

router.get('/', async (ctx,next) => {

	const { roleList, shop, authority } = await common.authority(ctx,{
		url:'/api/current-user'
	})


	const { results:authorityList } = await baseModel.get(ctx,{
		url:'/api/admins/roles'
	})

	await ctx.render('authority',{
		pathName: ctx.path,
		authority,
		shop,
		roleList,
		authorityList
	})
})


router.post('/admin',async (ctx,next) => {

	await baseModel.get(ctx,{
		url:'/api/admins/permissions'
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})


router.post('/edit/roles',async (ctx,next) => {

	const roleId = ctx.request.body.roleId;

	await baseModel.get(ctx,{

		url:`/api/admins/roles/${roleId}/permissions`
	}).then((body) => {

		ctx.body = body;

	}).catch((err) => {

		console.log(err)

		ctx.status =  err.response.statusCode;

		ctx.body = err.response.body;

	})

})





module.exports = router;

