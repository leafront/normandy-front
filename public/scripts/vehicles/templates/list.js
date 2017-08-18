module.exports = `
<dt>
		<span class="vehicles_name">借款人</span>
		<span class="vehicles_car">车型</span>
		<span class="vehicles_vin">车架号</span>
		<span class="vehicles_color">颜色</span>
		<span>添加时间</span>
</dt>
<% if(list && list.length){%>
		<%list.forEach(function(item){%>
		<dd>
				<span class="vehicles_name"><%-item.borrower.name%></span>
				<span class="vehicles_car"><%-item.model%></span>
				<span class="vehicles_vin"><%-item.vin%></span>

				<span class="vehicles_color"><%-colorList[item.color] && colorList[item.color].name%></span>
				<span><%-item.created_at%></span>
		</dd>
	 <%})%>
<%}%>`;