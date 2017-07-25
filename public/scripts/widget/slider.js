

/**
 * last modify times 2017/04/18
 * name leafront
 */
define(['jquery'],function($){

  var Slider = function(elem,options){

    this.options = options;

    this.wrap = elem;

    this.now = this.options.index || 0;

    this.aBtn = $(this.options.aBtn).find('a');

    this.oUl = this.wrap.find(this.options.ulElements);

    this.aLiWidth = this.oUl.find(this.options.liElements).eq(0).width();

    this.oImgList = this.oUl.find(this.options.liElements).eq(0).clone();

    this.oUl.append(this.oImgList);

    this.aLi = this.oUl.find(this.options.liElements);

    this.prev = $(this.options.prev);

    this.next = $(this.options.next);
  };
  Slider.prototype={
    constructor:Slider,
    defaults:{
      activeClass:'active',//切换当前的class类名
      eventType:'mouseover',//鼠标点击类型
      times:800,    //点击按钮切换的时间
      tabStyle:'move',//滚动的类型
      autoTimes:2000, //自动切换的时间
      aBtn:'',//点击的控制按钮的class类名
      ulElements:'ul',
      liElements:'li',
      autoMove:true
    },
    init:function(){

      this.options = $.extend(this.defaults,this.options||{});

      this.aLi.css('width',this.wrap.width());

      this.oUl.css({'width':this.aLi.length * this.aLiWidth,'left':-this.now * this.aLiWidth});

      this.btn(this);

      this.toggle(this);

      if (this.options.autoMove) this.autoMove(this);
    },
    btn:function(_this){

      if (this.options.aBtn) {

        this.aBtn.on(this.options.eventType,function(){

          var index = $(this).index();

          _this.now = index;

          _this.options.tabStyle == 'fade' ? _this.fade(index) : _this.move(index);

        })
      }
    },
    toggle:function(_this){

      if(this.options.prev !== '' && this.options.next !== ''){
        this.prev.click(function(e) {
          _this.now--;

          _this.page();

          _this.options.tabStyle == 'move' ? _this.move(_this.now) : _this.fade(_this.now);

        })
        this.next.click(function(e) {

          _this.now++;

          _this.page();

          _this.options.tabStyle == 'move' ? _this.move(_this.now) : _this.fade(_this.now);

        })
      }
    },
    move:function(index){

      if(this.options.tabStyle == 'slider'){

        this.aLi.css({'position':'static','display':'block'});

      }
      this.aBtn.eq(index).addClass(this.options.activeClass).siblings().removeClass(this.options.activeClass);

      this.oUl.stop(true,true).animate({'left':-this.aLiWidth * index},this.options.times);

    },
    fade:function(index){
      this.aLi.css({'position':'absolute'});

      this.oUl.css({'position':'static'});

      this.aBtn.eq(index).addClass(this.options.activeClass).siblings().removeClass(this.options.activeClass);

      this.aLi.eq(index).stop(true,true).fadeIn(this.options.times).siblings().stop(true,true).fadeOut(this.options.times);

    },
    page:function(){

      if (this.now < 0){

        this.oUl.css('left',-(this.aLi.length-1) * this.aLiWidth);

        this.now = this.aLi.length-2;

      }
      if (this.now > this.aLi.length-1){

        this.oUl.css('left',0);

        this.now = 1;

      }
      if (this.now == this.aBtn.length){

        this.aBtn.eq(0).addClass(this.options.activeClass).siblings().removeClass(this.options.activeClass);

      }
    },
    autoMove:function(_this){

      var timer = setInterval(auto,this.options.autoTimes);

      this.wrap.hover(function(){

        clearInterval(timer);

        _this.prev.fadeIn(_this.options.times);

        _this.next.fadeIn(_this.options.times);

      },function(){

        _this.prev.fadeOut(_this.options.times);

        _this.next.fadeOut(_this.options.times);

        timer = setInterval(auto,_this.options.autoTimes);

      })
      function auto(){

        _this.now++;

        _this.page();

        _this.options.tabStyle == 'fade' ? _this.fade(_this.now) : _this.move(_this.now);

      }
    }
  };
  $.prototype.slider = function(options){

    return this.each(function(){

      new Slider($(this),options).init();

    })
  }
})
