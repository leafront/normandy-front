module.exports = `
 <dt>
	<span class="borrowers_number">编号</span>
	<span class="borrowers_name">姓名</span>
	<span class="borrowers_phone">手机</span>
	<span class="borrowers_regTime">注册时间</span>
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
				<% if(item.status == 0) {%><a class="list_action" href="/business/edit/<%-item.id%>"> / 完善借款信息</a><%}%>
		</dd>
	<%})%>
 <%}%>`;