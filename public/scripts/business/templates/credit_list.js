
module.exports = `
<% list.forEach(function(){%>
	<dd>
		<span class="credit_name"><%-item.nam%></span>
		<span class="credit_institution"><%-item.src</span>
		<span class="credit_status">查询状态</span>
		<span class="credit_times">查询时间</span>
		<span class="credit_actionName">操作员</span>
		<div class="credit_action">
			<a href="javascript:;" class="btn_buy">购买</a>
			 <a href="javascript:;" class="btn_see">查看</a>
		</div>
	</dd>
<%})%>`;