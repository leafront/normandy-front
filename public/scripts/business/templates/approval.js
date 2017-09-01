module.exports = `<%if (list && list.length){%>
    <h4>审批信息</h4>
    <div class="business_table">
        <dl class="business_table_list">
            <dt>
                <span>审批信息</span>
                <span>审批人</span>
                <span>阶段</span>
                <span>结果</span>
                <span>评分</span>
                <span>备注</span>
            </dt>
            <% list.forEach(function(item){%>
            <dd>
                <span><%-item.created_at%></span>
                <span><%-item.reviewer.name%></span>
                <span><%-borrowingStage[item.stage].name%></span>
                <span><button class="<%-borrowingResult[item.result].label_class%>"><%-borrowingResult[item.result].name%></button></span>
                <span><button class="<%-borrowingRating[item.result].label_class%>"><%-borrowingRating[item.result].name%></button></span>
                <span><%-item.remark%></span>
            </dd>
            <%})%>
        </dl>
    </div>
<%}%>`