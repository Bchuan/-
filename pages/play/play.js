// pages/play/play.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    off:false,
    timer:null,
    status:0,
    duration:0,
    currentPosition:0,
    currentFen:0,
    duratFen:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.init(that);
		console.log(options)
    if(options){
      var index = options.id;
      this.setData({
        inde: index,
        songL: app.songlist
      })
    }else{
      // console.log(15)
      this.dataInt();
    }
		console.log(this)
    var index=this.data.inde;
    console.log(index)
    if (app.songlist[index].data){
      var albummid = 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + app.songlist[index].data.albummid + '.jpg'
      this.setData({
        song: app.songlist[index].data,
        albummid: albummid,
        songmid: app.songlist[index].data.songmid
      })
    }else{
      var albummid = 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + app.songlist[index].albummid + '.jpg'
      this.setData({
        song: app.songlist[index],
        albummid: albummid,
        songmid: app.songlist[index].songmid
      })
    }
    
    this.autoPl();//播放
    // this.songIm();
    
  },
	dataInt:function(){//数据重新赋值
    console.log(16)
		this.setData({
			timer: null,
			status: 0,
			currentPosition: 0,
			currentFen: 0,
			duratFen: 0,
      animationData: {}
		})
	},
  autoPl:function(){//自动播放
    this.songIm();
    wx.playBackgroundAudio({
      dataUrl: 'http://ws.stream.qqmusic.qq.com/C100' + this.data.songmid + '.m4a?fromtag=38'
    })
    app.play=true;
  },

  playMu:function(){//播放暂停音乐控制
    if(this.data.off){
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/C100' + this.data.songmid + '.m4a?fromtag=38'
      })
      this.songIm();
      this.setData({
        off:false
      })
      app.play = true;
    }else{
      wx.pauseBackgroundAudio();
      clearInterval(this.data.timer);
      this.setData({
        off: true
      })
      app.play = false;
    }
    
  },

  // stopMu:function(){//暂停
  //   clearInterval(this.data.timer);
  //   console.log(this);
  //   console.log(11)
  // },

  playNe: function (ev,i){//播放下一首歌
    console.log(ev)
    clearInterval(this.data.timer);
    if(ev)
    {
      var id = parseInt(this.data.inde) + parseInt(ev.currentTarget.dataset.id);
    }else{
      var id = parseInt(this.data.inde) + i;//、、为何被当做字符串相加
    }
   
    console.log(id)
    this.setData({
      inde: id,
      width: 'x'
    })
    // console.log(that.data.width)
    var that=this;
    setTimeout(function () {
      that.onLoad();
    }, 1000)
  },

  songIm:function(){//获取歌曲数据
    clearInterval(this.data.timer);
    var that=this;
    this.data.timer=setInterval(function(){
      // console.log(that);
      if (that.data.width == "100%") {
        clearInterval(that.data.timer);
        console.log("jieshu")
        that.playNe('',1);
      }else{
        // console.log(1111)
        wx.getBackgroundAudioPlayerState({
          success: function (res) {
            // var status = res.status//播放状态
            // var dataUrl = res.dataUrl//歌曲数据链接
            // var currentPosition = res.currentPosition//歌曲播放位置
            // var duration = res.duration//歌曲时长
            // var downloadPercent = res.downloadPercent//音频的下载进度
            // console.log(res)
            that.dataSet(that, res)
          }
        })
        // console.log(that.data.currentPosition)
        // console.log(that.data.duration)//duration
        // console.log(that.data)
        // console.log(that.data.width)//、、为何与100行的不同步
          that.setData({
            width: that.data.currentPosition / that.data.duration * 100 + '%'
          })
      }
    },1000)
  },

  dataSet:function(that,res){//存储数据
    // console.log(res.currentPosition / res.duration)
    that.setData({
      status:res.status,
      currentPosition: res.currentPosition,//当前秒
      currentFen: parseInt(res.currentPosition/60),
      duration: res.duration,//总时长
      duratFen: parseInt(res.duration / 60)
    })
  },

  init:function(that){//获取屏幕高度宽度
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        that.setData({
          windowH: res.windowHeight,
          windowW:res.windowWidth
        })
        // console.log(res.language)
        // console.log(res.version)
        // console.log(res.platform)
      }
    })
  },
  //快进快退
  aheadOrback:function(ev){
    //获取屏幕宽度，
    console.log(ev)
    var x = (ev.touches[0].clientX - ev.target.offsetLeft);//距离起点的长度
    console.log(x);
    console.log(this);
    this.setData({
      width:x+'px',
      offLeft: ev.target.offsetLeft
    })
  },
  start:function(){//触摸开始
    console.log(this)
    clearInterval(this.data.timer);
  },
  Mend:function(){
    console.log(10010)
    console.log(this.data.width)
    console.log(this.data.windowW - this.data.offLeft * 2)

    var pos = parseInt(parseInt(this.data.width) / (this.data.windowW - this.data.offLeft * 2) * this.data.duration); 
    console.log(pos)
    this.setData({
      currentPosition: pos
    })
    wx.seekBackgroundAudio({
      position: pos
    })
    this.songIm()
  },
  //列表隐藏
  ListNone:function(){
    console.log(110)
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation;
    animation.bottom(-305).step();
    this.setData({
      animationData: animation.export()
    })
  },
  //列表显示
  ListShow:function()
  {
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 500,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation;
    animation.bottom(0).step();
    this.setData({
      animationData: animation.export()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})