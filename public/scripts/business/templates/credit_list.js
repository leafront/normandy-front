
module.exports = `
<dt>
		<span class="credit_name">报告名称</span>
		<span class="credit_institution">查询机构</span>
		<span class="credit_status">查询状态</span>
		<span class="credit_times">查询时间</span>
		<span class="credit_actionName">操作员</span>
		<span>操作</span>
</dt>
<% list.forEach(function(item,index){%>
	<dd>
		<span class="credit_name"><%-item.name%></span>
		<span class="credit_institution"><%-item.src%></span>

			<div class="list_status credit_status">
					<% if(risks[item.interface_name]){%>
					  <span class="<%-['list_btn1','list_btn2','list_btn4'][risks[item.interface_name].status]%>"> <%-['正在查询', '查询成功', '查询失败'][risks[item.interface_name].status]%></span>
					<%}else{%>
					  <span class="list_btn4">未查询</span>
				  <%}%>
			</div>

		<span class="credit_times"><%if(risks[item.interface_name]){%><%-risks[item.interface_name].created_at%><%}%></span>
		<span class="credit_actionName"><%if(risks[item.interface_name] && risks[item.interface_name].operator ){%><%-risks[item.interface_name].operator.name%><%}%></span>
		<div class="credit_action">
			<button class="btn_buy" <%if(!item.is_active){%>disabled="disabled"<%}%> data-query=<%-JSON.stringify({index:index,interface_name:item.interface_name})%>>购买</button>
			<button class="btn_see" <%if(!(risks[item.interface_name] && risks[item.interface_name].status==1)){%>disabled="disabled"<%}%> data-query=<%-JSON.stringify({interface_name:item.interface_name})%>>查看</button>
		</div>
	</dd>
<%})%>`;