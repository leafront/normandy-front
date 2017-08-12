module.exports = `
 <dt>
	<span class="business_num">借款编号</span>
	<span class="business_name">借款人</span>
	<span class="business_type">借款类型</span>
	<span class="business_money">借款金额</span>
	<span class="business_term">借款期限</span>
	<span class="business_time">申请时间</span>
	<span class="list_status">状态</span>
	<span>操作</span>
</dt>
<%if(list && list.length){%>
	<% list.forEach(function(item){%>
		<dd>
				<span class="business_num"><%-item.no%></span>
				<span class="business_name"><%-item.application.borrower.name%></span>
				<span class="business_type"><%-borrowingType[item.type].name%></span>

				<span class="business_money"><%-item.amount%></span>
				<span class="business_term"><%-item.term + termUnit[item.term_unit].name%></span>
				<span class="business_time"><%-item.created_at%></span>
				<div class="list_status">
					<span class="<%-borrowingStatus[item.status].color%>"><%-borrowingStatus[item.status].title%></span>
					<% if(item.status == 0){%>
						<span class="<%-autoReviewStatus[item.application.auto_review_status].color%>"><%-autoReviewStatus[item.application.auto_review_status].title%></span>
					<%}%>

					<% if([0,1].indexOf(item.status) > -1){%>
						<span class="list_btn1"><%-phoneReviewStatus[item.application.phone_review_status].title%></span>
					<%}%>
				</div>
				<a class="list_action" href="/business/<%-item.id%>">详情</a>
				<% if(item.status == 0) {%><a class="list_action" href="/business/edit?id=<%-item.id%>"> / 完善借款信息</a><%}%>
		</dd>
	<%})%>
 <%}%>`;