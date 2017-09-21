var Lizard = require('./widget/lizard');

var common = {

	headerMenu: function(){


		var headerLogo = document.querySelector('.header-logo');

		var asideMenu = document.querySelector('.aside-menu');

		var logoImg = document.querySelector('.header_logo_img');

		var navLink = document.querySelectorAll('.js_nav_link');

		var headerTop = document.querySelector('.header-top');

		var rightContainer = document.querySelector('.right-container');

		document.querySelector('.js_narrow').addEventListener('click',() =>{

			Lizard.toggleClass(headerLogo,'header_menu_scale');

			Lizard.toggleClass(asideMenu,'header_menu_scale');

			Lizard.toggleClass(logoImg,'active');

			for (let i = 0, len = navLink.length; i < len; i++) {

				Lizard.toggleClass(navLink[i],'active');

			}

			Lizard.toggleClass(headerTop,'header_menu_toggle');

			Lizard.toggleClass(rightContainer,'header_menu_toggle');

		})

		var clientHeight = document.documentElement.clientHeight;

		document.querySelector('.container').style.height = clientHeight + 'px';

		document.querySelector('.right-container').style.minHeight = clientHeight + 'px';


		var message = document.querySelector('.header_message_list');

		var notice  = document.querySelector('.header_notice');

		var logout = document.querySelector('.js_logout');

		var userBtn = document.querySelector('.js_user');

		var userInfo = document.querySelector('.user_info');


		message.addEventListener('click',function(event){

			event.stopPropagation();

			notice.classList.add('active');

		})


		document.documentElement.addEventListener('click',() =>{

			notice.classList.remove('active');

			userInfo.classList.remove('active');

		})


		logout.addEventListener('click',() =>{ //退出登录

			Lizard.clearCookie();

			location.href = '/user/login';

		})


		userBtn.addEventListener('click',(event) =>{ //用户信息

			event.stopPropagation();

			Lizard.toggleClass(userInfo,'active');

		})

		this.getMessage();



	},
	getMessage(){

		var userName = document.querySelector('.authority_name').innerHTML;

		Lizard.ajax({
			type:'POST',
			url:'/user/message'
		}).then((data) => {

			var msgList = data.content;

			if(data && msgList.length){

				var getDateDiff = Lizard.getDateDiff;

				var html = msgList.map((item) => {
					return `
								<dd>
										<img src="https://imgthisisdashcdn-83chedai-com.alikunlun.com/identicons/135.png" class="notice_img fl"/>
										<div class="notice_cont fr">
										<div class="notice_txt">
										<strong>${userName}</strong>
										<time>${getDateDiff(item.created_at)}</time>
										</div>
										<p>${item.content}</p>
									</div>
									</dd>`
				}).join('');

				document.querySelector('.notice_list').innerHTML = html;

				var msgName = document.querySelectorAll('.js_msgNume');

				msgName[0].style.display = 'block';

				Array.prototype.slice.apply(msgName).forEach((item) => {

					item.innerHTML = msgList.length;

				})


			} else {

				msgName[1].innerHTML = 0;

				document.querySelector('.notice_list').innerHTML = '<dd><p>当前无信息</p></dd>';
			}

		})

	},
	getPage: function (page,showPage) {

		var iPage = 0;

		if ((page % showPage) == 0){

			iPage = Math.floor((page / showPage -1)) * showPage;

		} else {

			iPage = Math.floor(page / showPage) * showPage;

		}

		return iPage

	},
	dropMenu: function  () {

		document.documentElement.addEventListener('click',() => {

			this.dropMenu =  -1;

		})

	},
	isEmptyObject (value){

		for (var attr in value) {

			return false;
		}

		return true;
	},
	deleteEmptyProperty(object){

		for (var attr in object) {

			var value = object[attr];

			if (value === '' || value === null || value === undefined) {

				delete object[attr];
			}

		}

		return object;
	},

	changeObject (arr,key,value) {

		var object = {};

		arr.forEach((item) =>{

			object[item[key]] = item[value];

		})

		return object;

	},

	deleteEmptyArray (object,arr,property) {

		arr.forEach((item) => {

			for (var attr in item) {

				var value = item[attr];

				if (value === '' || value === null || value === undefined) {

					delete item[attr];
				}

			}
		})

		object.forEach((item) => {

			item[property].forEach((child,index) => {

				if (common.isEmptyObject(child)) {

					item[property].splice(index,1);

				}

			})
		})
	}
}


module.exports = common;
