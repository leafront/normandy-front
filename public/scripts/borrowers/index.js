/**
 * Created by leafrontye on 2017/7/26.
 */


require([
	'../config'
], function(){
	require([
		'jquery',
		'common',
		'Lizard'
	], function(
		$,
		common,
		Lizard
	){

		common.headerMenu();

		$.ajax({
			url:'http://shop.qgqg.me/api/borrowers?page=1',
			type: 'GET',
			dataType: 'json',
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiXHU4ZDc1XHU1MTY4XHU4MGZkIiwibW9iaWxlIjoiMTUyMDAwMDAwMDkiLCJpZCI6IjRkZjU0OTkyLTU4MTUtNGY0ZS04NzBlLTZlZWE3ZjVhMDA5OCJ9.mruVMhIQbXm_VCwPxUkOL886v1MlHw94kOJfowu833g');
				xhr.setRequestHeader('X-Org','748e0329-875b-4c7f-9a70-5cc9757e80ac')
			},
			success:function(data){

			}
		})

	})
})
