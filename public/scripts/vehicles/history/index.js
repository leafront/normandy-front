
window.$ = require('../../lib/jquery');

var Page = require('../../widget/page');

var Lizard = require('../../widget/lizard');

var popup = require('../../widget/popup');

var map;   //百度地图对象
var car;   //汽车图标
var label; //信息标签
var centerPoint;

var timer;     //定时器

var index = 0; //记录播放到第几个point

var points = [];


Page({

	onShow() {

		map = new BMap.Map("container");

		map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);


	},

	getHistory () {

		var begin_time = $.trim($('#start').val());

		var end_time = $.trim($('#end').val());

		if (!begin_time) {

			Lizard.showToast('请选择开始时间');

			return;

		}

		if (!end_time) {

			Lizard.showToast('请选择结束时间');

			return;

		}

		var results = []

		Lizard.ajax({
			type:'POST',
			url:`/api/gps/history/868120142583340`,
			async:false,
			data:{
				begin_time,//: '2017-07-04 14:07:12',
				end_time,//: '2017-07-05 14:07:12',
				limit: 1000
			},
			success: (data) =>{

				results = data.data;

			}

		})

		if (!results.length) {

			return false;
		}


		results.forEach(function (item) {

			points.push(new BMap.Point(item.lng, item.lat));

		})

		return true;

	},
	map () {

		//初始化地图,选取第一个点为起始点

		map.centerAndZoom(points[0], 14);
		map.enableScrollWheelZoom();
		map.addControl(new BMap.NavigationControl());
		map.addControl(new BMap.ScaleControl());
		map.addControl(new BMap.OverviewMapControl({isOpen: true}));

		//通过DrivingRoute获取一条路线的point
		//var driving = new BMap.DrivingRoute(map);
		//driving.search(points[0], points[points.length - 1]);
		//driving.setSearchCompleteCallback(function () {
			//得到路线上的所有point

			//points = driving.getResults().getPlan(0).getRoute(0).getPath();



		//})


		$('#play').prop('disabled',false);


		//画面移动到起点和终点的中间
		centerPoint = new BMap.Point((points[0].lng + points[points.length - 1].lng) / 2, (points[0].lat + points[points.length - 1].lat) / 2);
		map.panTo(centerPoint);


		//显示小车子
		car = new BMap.Marker(points[0], {icon: new BMap.Icon("/images/car.png", new BMap.Size(67, 50), {imageOffset: new BMap.Size(0, 0)})});

		var carStart = new BMap.Marker(points[0], {icon: new BMap.Icon("/images/map_start.png", new BMap.Size(51, 67))});

		var carEnd = new BMap.Marker(points[points.length -1], {icon: new BMap.Icon("/images/map_end.png", new BMap.Size(51, 67))});

		map.addOverlay(car);

		map.addOverlay(carStart);

		map.addOverlay(carEnd);
	},

	play() {
		var point = points[index];

		if (index > 0) {
			map.addOverlay(new BMap.Polyline([points[index - 1], point], {
				strokeColor: "#3eb0fd",
				strokeWeight: 8,
				strokeOpacity: 1
			}));
		}
		car.setPosition(point);

		$('#speed').text('ere');

		$('#mileage').text('werew');

		$('#runTime').text('werew');

		$('#signal').text('werewr');

		index++;

		//map.panTo(point);


		if (index < points.length) {

			$('#play').prop('disabled',true);

			$('#stop').prop('disabled',false);

			$('#reset').prop('disabled',false);


			timer = setTimeout(() =>{
				this.play();
			}, 50);

		} else {

			map.panTo(point);
		}

		if (index == points.length - 1) {

			$('#play').prop('disabled',false);
			$('#stop').prop('disabled',true);
			$('#reset').prop('disabled',true);

			var sContent = `
				<div class="map_popup">
					<div class="map_item">
						<label>总时间：</label>
						<span id="speed">18公里/小时</span>
					</div>

					<div class="map_item">
						<label>里程：</label>
						<span id="mileage">5.291公里</span>
					</div>
					<div class="map_item">
						<label>运行：</label>
						<span id="runTime">3分10秒</span>
					</div>
					<div class="map_item">
						<label>停留：</label>
						<span id="stopTime">42432</span>
					</div>
			 </div>`;


			map.addOverlay(car);

			var infoWindow = new BMap.InfoWindow(sContent);

			car.openInfoWindow(infoWindow);

			car.addEventListener("click", function () {
				this.openInfoWindow(infoWindow);
			});

		}
	},

	bindEvents() {

		var This = this;

		$('#stop').click(function(){

			$('#play').prop('disabled',false);

			$('#stop').prop('disabled',true);

			if(timer) {
				window.clearTimeout(timer);
			}

		})

		$('#reset').click(function(){

				$('#play').prop('disabled',false);

				$('#stop').prop('disabled',true);

			  $('#reset').prop('disabled',true);

				if(timer) {
					window.clearTimeout(timer);
				}
				index = 0;
				car.setPosition(points[0]);
				//map.panTo(centerPoint);

		})


		$('#play').click(function(){

			var isHistory = This.getHistory();

			if (!isHistory) {

				Lizard.showToast('当前无历史记录回放');

				return;

			}

			This.map();

			var sContent = `
				<div class="map_popup">
					<div class="map_item">
						<label>速度：</label>
						<span id="speed">18公里/小时</span>
					</div>

					<div class="map_item">
						<label>里程：</label>
						<span id="mileage">5.291公里</span>
					</div>
					<div class="map_item">
						<label>信号：</label>
						<span id="signal">3分10秒</span>
					</div>
					<div class="map_item">
						<label>运行：</label>
						<span id="runTime">42432</span>
					</div>
			 </div>`;


			map.addOverlay(car);

			var infoWindow = new BMap.InfoWindow(sContent);

			car.openInfoWindow(infoWindow);

			This.play();

		})

	}
})




