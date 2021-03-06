module.exports = `
<dt>
		<span class="shop_name">名称</span>
		<span class="shop_abbreviation">简称</span>
		<span class="shop_address">地址</span>
		<span class="shop_phone">电话</span>
		<span class="user_status">状态</span>
		<span class="shop_time">创建时间</span>
		<span>操作</span>
</dt>
<% if (list && list.length){%>
	<% list.forEach(function(item){%>
	<dd>
			<span class="shop_name"><%-item.name%></span>
			<span class="shop_abbreviation"><%-item.short_name%></span>
			<span class="shop_address"><%-item.address%></span>
			<span class="shop_phone"><%-item.phone%></span>
			<div class="user_status">
					<% if(item.is_active){%>
					<span class="usable_btn">可用</span>
					<%}else {%>
					<span class="disable_btn">不可用</span>
					<%}%>

			</div>
			<span class="shop_time"><%-item.created_at%></span>
			<div class="shop_action">
					<a class="list_action" @click="editPopup('#editPopup','<%-item.id%>')" href="javascript:;">编辑 </a>
					<a class="list_action" @click="deleteShop('<%-item.id%>')" href="javascript:;"> / 删除 </a>
			</div>
	</dd>
	<%})%>
<%}%>`;