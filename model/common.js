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

			const { shopuser: { shop={}, roles=[] } } = authority;

			let roleList = [];

			roles.forEach((item) => {

				item.permissions.forEach((child) =>{

					roleList.push(child.code);
				})
			})

			return { roleList, shop, authority }

		}catch(err){

			return { roleList:[], shop:{}, authority:{} }

		}




   }
}