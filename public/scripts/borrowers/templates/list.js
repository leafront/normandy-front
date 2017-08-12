module.exports = `
<dl class="cont_list">
		 <dt>
			 <span class="borrowers_number">编号</span>
			 <span class="borrowers_name">姓名</span>
			 <span class="borrowers_phone">手机</span>
			 <span class="borrowers_regTime">注册时间</span>
			 <span>操作</span>
		 </dt>
	 <% if(list && list.length){%>
			 <%list.forEach(function(item,index){%>
			 <dd>
					 <span class="borrowers_number"><%-item.id%></span>
					 <span class="borrowers_name"><%-item.name%></span>
					 <span class="borrowers_phone"><%-item.mobile%></span>
					 <span class="borrowers_regTime"><%-item.created_at%></span>
					 <a class="list_action" href="/borrowers/<%-item.id%>">详情</a>
			 </dd>
			 <%})%>
	 <%}%>
 </dl>`;
