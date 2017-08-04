/**
 * Created by leafrontye on 2017/7/26.
 */

var baseModel = require('./baseModel');


module.exports = {

	async authority (ctx,{gateway,url,data}){

		const authority = await baseModel.get(ctx, {
			gateway,
			url,
			data
		})

		try{

			const { shopuser: { shop={}, roles=[] }, is_admin } = authority;

			let roleList = is_admin ? ['SUPER_ADMIN'] : [];

			roles.forEach((item) => {

				item.permissions.forEach((child) =>{

					roleList.push(child.code);
				})
			})

			return { roleList, shop, authority }

		}catch(err){


			return { roleList:[], shop:{}, authority:{} }

		}

  },
	getPage(page,showPage) {

		let iPage = 0;

		if ((page % showPage) == 0){

			iPage = Math.floor((page / showPage -1)) * showPage;

		} else {

			iPage = Math.floor(page / showPage) * showPage;

		}

		return iPage

	},
	colorList:[
		{'name':'银色',   'value': 0},
		{'name':'黑色',   'value': 1},
		{'name': '白色',   'value': 2},
		{'name': '灰色',   'value': 3},
		{'name': '红色',   'value': 4},
		{'name': '金色',   'value': 5},
		{'name': '黄色',   'value': 6},
		{'name': '绿色',   'value': 7},
		{'name': '紫色',   'value': 8},
		{'name': '橙色',   'value': 9},
		{'name': '棕色',   'value': 10},
		{'name': '米色',   'value': 11},
		{'name': '巧克力色', 'value': 12},
		{'name': '香槟色', 'value': 13}
	]
}