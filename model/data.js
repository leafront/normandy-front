

var condition = {"true":"是","false":"否","null":"未知"};

var nullBooleanOptions = [{value:"true",name:"是"},{value:"false",name:"否"},{value:"null",name:"未知"}];

var booleanOptions = [
	{
		"name": "否",
		"value": 0
	},
	{
		"name": "是",
		"value": 1
	}
];
var certificateType = [
	{
		"name": "登记证",
		"value": 0
	},
	{
		"name": "行驶证",
		"value": 1
	},
	{
		"name": "驾照",
		"value": 2
	},
	{
		"name": "车损险",
		"value": 3
	},
	{
		"name": "责任险",
		"value": 4
	},
	{
		"name": "盗抢险",
		"value": 5
	}
];

var  starterStatus = [
	{
		"name": "正常",
		"value": 0
	},
	{
		"name": "异响",
		"value": 1
	},
	{
		"name": "故障",
		"value": 2
	},
	{
		"name": "漏油",
		"value": 3
	}
];

var transmissionStatus = [
	{
		"name": "正常",
		"value": 0
	},
	{
		"name": "异响",
		"value": 1
	},
	{
		"name": "故障",
		"value": 2
	},
	{
		"name": "漏油",
		"value": 3
	}
]

var deviceType = [{
	name: '有线',
	value: '0'
},{
	name: '无线',
	value: '1'
}];

var engineStatus =  [
	{
		"name": "正常",
		"value": 0
	},
	{
		"name": "异响",
		"value": 1
	},
	{
		"name": "故障",
		"value": 2
	},
	{
		"name": "漏油",
		"value": 3
	}
];

var borrowingStage = [
	{
		name:'初审',
		value:0
	},{
		name:'主审',
		value:1
	},{
		name:'财审',
		value:2
	},{
		name:'复审',
		value:3
	}
];
var borrowingResult  = [
	{'label_class': 'btn_success', 'name': '通过', 'value': 0},
	{'label_class': 'btn_warning', 'name': '驳回', 'value': 1},
	{'label_class': 'btn_danger', 'name': '拒绝', 'value': 2}
];

var borrowingRating = [
	{'label_class': 'btn_success', 'name': '良好', 'value': 0},
	{'label_class': 'btn_warning', 'name': '一般', 'value': 1},
	{'label_class': 'btn_danger',  'name': '较差', 'value': 2}
];
var exhaustStatus = [
	{
		"name": "正常",
		"value": 0
	},
	{
		"name": "黑烟",
		"value": 1
	},
	{
		"name": "蓝烟",
		"value": 2
	},
	{
		"name": "漏气",
		"value": 3
	}
];

var isWorkOk =[
	{
		name:'优',
		value:0
	},{
		name:'良',
		value:1
	},{
		name:'可',
		value:2
	},{
		name:'差',
		value:3
}];

var interiorStatus = [
	{
		name:'优',
		value:0
	},{
		name:'良',
		value:1
	},{
		name:'可',
		value:2
	},{
		name:'差',
		value:3
}];

var surfaceStatus =[
	{
		name:'优',
		value:0
	},{
		name:'良',
		value:1
	},{
		name:'可',
		value:2
	},{
		name:'差',
		value:3
}];

var collateralLastFree =[
	{
		"name": "未抵押过",
		"value": 0
	},
	{
		"name": "10天内",
		"value": 1
	},
	{
		"name": "1个月内",
		"value": 2
	},
	{
		"name": "1-3个月(含)",
		"value": 3
	},
	{
		"name": "3-6个月(含)",
		"value": 4
	},
	{
		"name": "6-12个月(含)",
		"value": 5
	},
	{
		"name": "1-3年(含)",
		"value": 6
	},
	{
		"name": "3-5年(含)",
		"value": 7
	},
	{
		"name": "5年以上",
		"value": 8
}];

var purchaseType = [{
	name: '全款',
	value: 0
}, {
	name: '按揭',
	value: 1
}];

var colorList = [
	{
	  'name':'银色',
		'value': 0,
		color:'#c0c0c0'
	},
	{
		'name':'黑色',
		'value': 1,
		color:'#000000'
	},
	{
		'name': '白色',
		'value': 2,
		color:'#f5f5f5'
	},
	{
		'name': '灰色',
		'value': 3,
		 color:'#808080'
	},
	{
		'name': '红色',
		'value': 4,
		color:'#ff0000'
	},
	{
		'name': '金色',
		'value': 5,
		color:'#ffd700'
	},
	{
		'name': '黄色',
		'value': 6,
		color:'#ffff00'
	},
	{
		'name': '绿色',
		'value': 7,
		color:'#22ac38'
	},
	{
		'name': '紫色',
		'value': 8,
		color:'#8957a1'
	},
	{
		'name': '橙色',
		'value': 9,
		color:'#ff9c00'
	},
	{
		'name': '棕色',
		'value': 10,
		color:'#7f2d00'
	},
	{
		'name': '米色',
		'value': 11,
		color:'#f5f5dc'
	},
	{
		'name': '巧克力色',
		'value': 12,
		color:'#d2691e'
	},
	{
		'name': '香槟色',
		'value': 13,
		color:'#dfb981'
}];

var carType = [{
	name: '大型汽车', value: 1
}, {
	name: '小型汽车', value: 2
},{
	name:'使馆汽车', value:3
},{
	name:'领馆汽车', value:4
},{
	name:'境外汽车', value:5
},{
	name:'外籍汽车', value:6
},{
	name:'两三轮摩托', value:7
},{
	name:'轻便摩托车', value:8
},{
	name:'使馆摩托车', value:9
},{
	name: '领馆摩托车', value:10
},{
	name:'境外摩托车', value:11
},{
	name:'外籍摩托车', value:12
},{
	name:'农用运输车', value:13
},{
	name:'拖拉机', value:14
},{
	name:'挂车', value:15
},{
	name:'教练汽车',value:16
},{
	name:'教练摩托车',value:17
},{
	name: '香港入境车', value: 26
},{
	name: '澳门入境车', value: 27
}];

var surfaceStatus =[{
	name:'优',
	value:0
},{
	name:'良',
	value:1
},{
	name:'可',
	value:2
},{
	name:'差',
	value:3
}];


var borrowingType = [{
	name: '抵押借款',
	value: 0,
}, {
	name: '质押借款',
	value: 1,
},{
	name: '库存融资',
	value: 2
}];

var termUnit = [{
	name:'天',
	value:0
}, {
	name:'个月',
	value:1
}];

var repaymentType = [
{
	"name": "先息后本",
	"value": 0
},
{
	"name": "等本等息",
	"value": 1
},
{
	"name": "等额本息",
	"value": 2
},
{
	"name": "等额本金",
	"value": 3
}];

var education = [
	{
		"name": "未知",
		"value": 0
		},
	{
		"name": "文盲",
		"value": 1
		},
	{
		"name": "小学",
		"value": 2
		},
	{
		"name": "初中",
		"value": 3
		},
	{
		"name": "高中",
		"value": 4
		},
	{
		"name": "本科",
		"value": 5
		},
	{
		"name": "研究生",
		"value": 6
		},
	{
		"name": "博士",
		"value": 7
		}
	];

var borrowingStatus = {
	'0': {'title': '待初审', "stage": "初审", 'color': 'list_btn3'},
	'1': {'title': '待主审',  "stage": "主审", 'color': 'list_btn1'},
	'-1': {'title': '初审拒绝', 'color':'list_btn4'},
	'2': {'title': '待财审', "stage": "财审",'color': 'list_btn1',},
	'-2': {'title': '主审拒绝', 'color': 'list_btn4'},
	'3': {'title': '待复审', "stage": "复审", 'color': 'list_btn2'},
	'-3': {'title': '财审拒绝', 'color': 'list_btn4'},
	'null':{'title':'未上标','color':'list_btn4'},
	'4': {'title': '还款中', 'color': 'list_btn'},
	'-4': {'title': '复审拒绝', 'color': 'list_btn4'},
	'5': {'title': '还款完成', 'color': 'list_btn'},
	'-5': {'title': '坏账', 'color': 'list_btn4'}
}
var autoReviewStatus = {
	0: {'title': '已创建机审', 'color': 'list_btn3'},
	1: {'title': '正在机审', 'color': 'list_btn1'},
	2: {'title': '机审通过', 'color': 'list_btn2'},
	3: {'title': '机审拒绝', 'color': 'list_btn4'}
}

var phoneReviewStatus = {
	0: {'title': '等待电核', 'color': 'list_btn3'},
	1: {'title': '电核完成', 'color': 'list_btn2'}
}

var shiftingType = [
	{
		"name": "手动",
		"value": 0
	},
	{
		"name": "自动",
		"value": 1
	}
];

var driverType = [
	{
		"name": "两驱",
		"value": 0
		},
	{
		"name": "四驱",
		"value": 1
		}
];

var maritalStatus = {
	"false": "未婚",
	"true": "已婚",
	"null": "未知"
};

var maritalStatusList = [
	{
		"name": "未婚",
		"value": false
		},
	{
		"name": "已婚",
		"value": true
		},
	{
		"name": "未知",
		"value": "null"
		}
];

var companyType = [
{
	"name": "事业/机关",
	"value": 0
},
{
	"name": "国有",
	"value": 1
},
{
	"name": "私营",
	"value": 2
},
{
	"name": "股份",
	"value": 3
},
{
	"name": "个体",
	"value": 4
},
{
	"name": "其他",
	"value": 5
}
];

var salaryType = [
	{
		"name": "自雇",
		"value": 0
	},
	{
		"name": "受薪",
		"value": 1
	}
];


var purposeType = [
	{
		"name": "经营",
		"value": 0
	},
	{
		"name": "装修",
		"value": 1
	},
	{
		"name": "婚庆",
		"value": 2
	},
	{
		"name": "教育",
		"value": 3
	},
	{
		"name": "旅游",
		"value": 4
	},
	{
		"name": "其他消费",
		"value": 5
	}
];
var borrowingSeriesType =[
	{
		"name": "一借",
		"value": 0
	},
	{
		"name": "续借",
		"value": 1
	},
	{
		"name": "二借",
		"value": 2
	}
];

var nation =  [
	{
		'title': '汉族',
		'value': 'hanzu'
	},
	{
		'title': '蒙古族',
		'value': 'mengguzu'
	},
	{
		'title': '回族',
		'value': 'huizu'
	},
	{
		'title': '藏族',
		'value': 'zangzu'
	},
	{
		'title': '维吾尔族',
		'value': 'weiwuerzu'
	},
	{
		'title': '苗族',
		'value': 'miaozu'
	},
	{
		'title': '彝族',
		'value': 'yizu'
	},
	{
		'title': '壮族',
		'value': 'zhuangzu'
	},
	{
		'title': '布依族',
		'value': 'buyizu'
	},
	{
		'title': '朝鲜族',
		'value': 'chaoxianzu'
	},
	{
		'title': '满族',
		'value': 'manzu'
	},
	{
		'title': '侗族',
		'value': 'dongzu'
	},
	{
		'title': '瑶族',
		'value': 'yaozu'
	},
	{
		'title': '白族',
		'value': 'baizu'
	},
	{
		'title': '土家族',
		'value': 'tujiazu'
	},
	{
		'title': '哈尼族',
		'value': 'hanizu'
	},
	{
		'title': '哈萨克族',
		'value': 'hasakezu'
	},
	{
		'title': '傣族',
		'value': 'daizu'
	},
	{
		'title': '黎族',
		'value': 'lizu'
	},
	{
		'title': '傈僳族',
		'value': 'lisuzu'
	},
	{
		'title': '佤族',
		'value': 'wazu'
	},
	{
		'title': '畲族',
		'value': 'shezu'
	},
	{
		'title': '高山族',
		'value': 'gaoshanzu'
	},
	{
		'title': '拉祜族',
		'value': 'lahuzu'
	},
	{
		'title': '水族',
		'value': 'shuizu'
	},
	{
		'title': '东乡族',
		'value': 'dongxiangzu'
	},
	{
		'title': '纳西族',
		'value': 'naxizu'
	},
	{
		'title': '景颇族',
		'value': 'jingpozu'
	},
	{
		'title': '柯尔克孜族',
		'value': 'keerkezizu'
	},
	{
		'title': '土族',
		'value': 'tuzu'
	},
	{
		'title': '达斡尔族',
		'value': 'dawoerzu'
	},
	{
		'title': '仫佬族',
		'value': 'mulaozu'
	},
	{
		'title': '羌族',
		'value': 'qiangzu'
	},
	{
		'title': '布朗族',
		'value': 'bulangzu'
	},
	{
		'title': '撒拉族',
		'value': 'salazu'
	},
	{
		'title': '毛南族',
		'value': 'maonanzu'
	},
	{
		'title': '仡佬族',
		'value': 'gelaozu'
	},
	{
		'title': '锡伯族',
		'value': 'xibozu'
	},
	{
		'title': '阿昌族',
		'value': 'achangzu'
	},
	{
		'title': '普米族',
		'value': 'pumizu'
	},
	{
		'title': '塔吉克族',
		'value': 'tajikezu'
	},
	{
		'title': '怒族',
		'value': 'nuzu'
	},
	{
		'title': '乌孜别克族',
		'value': 'wuzibiekezu'
	},
	{
		'title': '俄罗斯族',
		'value': 'eluosizu'
	},
	{
		'title': '鄂温克族',
		'value': 'ewenkezu'
	},
	{
		'title': '德昂族',
		'value': 'deangzu'
	},
	{
		'title': '保安族',
		'value': 'baoanzu'
	},
	{
		'title': '裕固族',
		'value': 'yuguzu'
	},
	{
		'title': '京族',
		'value': 'jingzu'
	},
	{
		'title': '塔塔尔族',
		'value': 'tataerzu'
	},
	{
		'title': '独龙族',
		'value': 'dulongzu'
	},
	{
		'title': '鄂伦春族',
		'value': 'elunchunzu'
	},
	{
		'title': '赫哲族',
		'value': 'hezhezu'
	},
	{
		'title': '门巴族',
		'value': 'menbazu'
	},
	{
		'title': '珞巴族',
		'value': 'luobazu'
	},
	{
		'title': '基诺族',
		'value': 'jinuozu'
	}
];



var livingConditions = [{
	name:'独居',
	value:0
},{
	name:'配偶',
	value:1
},{
	name:'父母',
	value:2
},{
	name:'子女',
	value:3
},{
	name:'亲友',
	value:4
}];

var gender = [{
	name: '女',
	value: 0
},{
	name:'男',
	value:1
}];

var borrowingConditions = [{
	name:'配偶',
	value:0
},{
	name:'子女',
	value:1
},{
	name:'父母',
	value:2
},{
	name:'公司同事',
	value:3
},{
	name:'朋友',
	value:4
},{
	name:'完全保密',
	value:5
}];
var houseStatus = [{
	name:'自有',
	value:0
},{
	name:'租房',
	value:1
}];

var vehicleStatus = [{
	name:'自有',
	value:0
},{
	name:'租赁',
	value:1
}];

var selfResidenceTime = [
	{
		"name": "三个月以内",
		"value": 0
	},
	{
		"name": "本年内",
		"value": 1
	},
	{
		"name": "一年以内",
		"value": 2
	},
	{
		"name": "一至两年",
		"value": 3
	},
	{
		"name": "两至三年",
		"value": 4
	},
	{
		"name": "三至五年",
		"value": 5
	},
	{
		"name": "五至十年",
		"value": 6
	},
	{
		"name": "十年以上",
		"value": 7
}];

var answerStatus = [{
		"name": "熟悉",
		"value": 0
	},{
		"name": "一般",
		"value": 1
	},{
		"name": "不熟悉",
		"value": 2
}];

var emerContactFrequency = [{
		"name": "经常",
		"value": 0
	},{
		"name": "偶尔",
		"value": 1
	},{
		"name": "极少",
		"value": 2
}];

var companyScale = [{
	"name": "5人以内",
	"value": 0
 },{
		"name": "10人以内",
		"value": 1
	},{
		"name": "10-20人",
		"value": 2
	},{
		"name": "20-50人",
		"value": 3
	},{
		"name": "50-100人",
		"value": 4
	},{
		"name": "100-200人",
		"value": 5
	},{
		"name": "200-500人",
		"value": 6
	},{
		"name": "500人以上",
		"value": 7
	},{
		"name": "无职业",
		"value": 8
}];


var seniority = [{
		"name": "一年内",
		"value": 0
	},
	{
		"name": "一年以上",
		"value": 1
	},
	{
		"name": "未知",
		"value": 2
}];

var loanType = [{
	"name": "抵押",
	"value": 0
},{
	"name": "质押",
	"value": 1
}];

var gpsStatus = [{

	name:'正常',
	value:0
},{
	name:'异常',
	value:1
},{
	name:'预警',
	value:2
},{
	name:'未安装',
	value:3
}];

module.exports = {
	deviceType,
	gpsStatus,
	loanType,
	seniority,
	companyScale,
	gender,
	answerStatus,
	livingConditions,
	borrowingConditions,
	nation,
	condition,
	maritalStatusList,
	surfaceStatus,
	collateralLastFree,
	purchaseType,
	colorList,
	carType,
	borrowingType,
	termUnit,
	borrowingStatus,
	autoReviewStatus,
	phoneReviewStatus,
	certificateType,
	starterStatus,
	transmissionStatus,
	interiorStatus,
	engineStatus,
	exhaustStatus,
	isWorkOk,
	shiftingType,
	driverType,
	purposeType,
	booleanOptions,
	nullBooleanOptions,
	borrowingStage,
	repaymentType,
	borrowingResult,
	borrowingRating,
	maritalStatus,
	companyType,
	borrowingSeriesType,
	salaryType,
	education,
	houseStatus,
	selfResidenceTime,
	vehicleStatus,
	emerContactFrequency
}
