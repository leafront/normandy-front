module.exports = `
	<dt>
		<span class="vehicles_vin">车架号</span>
		<span class="vehicles_subject">车牌号</span>
		<span class="vehicles_name">借款人</span>
		<span class="vehicles_times">添加时间</span>
		<span class="vehicles_status">标的状态</span>
		<span class="vehicles_gps">GPS设备</span>
		<span class="vehicles_gpsStatus">GPS状态</span>
		<span>操作</span>

	</dt>
	<% if(list && list.length){%>
		<%list.forEach(function(item,index){%>
		<dd>
				<a class="vehicles_vin list_action" href="/vehicles/<%-item.id%>"><%-item.vin%></a>
				<span class="vehicles_subject"><%-item.plate_number%></span>
				<span class="vehicles_name"><%-item.borrower.name%></span>
				<span class="vehicles_times"><%-item.created_at.toString().slice(0,-10)%></span>
				<span class="vehicles_status">
						<% if(borrowingStatus[item.borrowing_status]) {%>
							<%-borrowingStatus[item.borrowing_status] && borrowingStatus[item.borrowing_status].title%>
						<%} else {%>
							<%-'未上标'%>
						<%}%>

				</span>
				<div class="vehicles_gps">
					<div class="drop_menu drop-menu-gps" :class="{'active':dropMenu == '<%-item.id%>'}">
						<span @click.stop='selectDropMenu("<%-item.id%>",<%-JSON.stringify(item.gps_devices)%>)' v-cloak><%if(item.gps_devices.length){%>查看设备状态<%}else{%>当前无GPS设备状态信息<%}%></span>
						<ul class="drop_menu_list">
								<% if (item.gps_devices && item.gps_devices.length > 0 ){ %>
										<% item.gps_devices.forEach(function(child,cIndex){%>
											<li>
												<a href="javascript:;"><%-child.imei%></a>
												<strong>（<%-deviceType[child.type] && deviceType[child.type].name%>）</strong>
												 <% if (child.status == 0){%>
														<strong class="disabled">监控（报废）</strong>
												 <%} else{%>
													<% if (child.imei) {%>
													 <template v-if= "gpsInfo[<%-child.imei%>]">
														 <strong @click="mapInfo(gpsInfo[<%-child.imei%>].device_info_new,<%-child.imei%>)" class="gps_info" v-if="gpsInfo[<%-child.imei%>].device_info == 0 && gpsInfo[<%-child.imei%>].device_info_new == 4">
																监控（{{deviceStatus[gpsInfo[<%-child.imei%>].device_info_new].name}}）
														 </strong>
														 <strong @click="mapInfo(gpsInfo[<%-child.imei%>].device_info,<%-child.imei%>)" :class="{'gps_info':[0,3,4].indexOf(gpsInfo[<%-child.imei%>].device_info) > -1,'disabled':[1,2].indexOf(gpsInfo[<%-child.imei%>].device_info > -1)}" v-else>
																 监控（{{deviceStatus[gpsInfo[<%-child.imei%>].device_info].name}})
														 </strong>
													 </template>
													 <template v-else>
															 <strong class="disabled">
																	当前无设备信息
															 </strong>
													 </template>
												 <%}%>
												<%}%>
											</li>

										<%})%>
								<%}%>
						</ul>
					</div>
				</div>
				<div class="vehicles_gpsStatus" v-if="gpsList.length">
						<span :class="{'gps_error':gpsList[<%-index%>].status == 1,'gps_warning':gpsList[<%-index%>].status == 2}" >{{gpsStatus[gpsList[<%-index%>].status].name}}</span>
						<div class="vehicles_tips" v-if="gpsList[<%-index%>].status == 1">
							 <p>{{gpsList[<%-index%>].msg}}</p>
							 <p>解决方案：{{gpsList[<%-index%>].solve}}</p>
						</div>
				</div>
				<div class="vehicles_gpsStatus" v-else>
						<span>状态正在更新...</span>
				</div>
				<span class="gps_action" @click="oneRefreshGps(<%-index%>,'<%-item.id%>')">刷新GPS状态</span>

		</dd>
		<%})%>
<%}%>`;