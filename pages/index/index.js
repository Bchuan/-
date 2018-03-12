var util=require("../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:["推荐","榜单","搜索"],
    navcur:0,
    searchKey: false,
    key:[],
    his:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    util.getRecom(function(data){//推荐页数据
      that.setData({
        radioList:data.radioList,//电台
        slider:data.slider,//轮播
        songList:data.songList//热门歌单
      })
    }),
      util.getTopLi(function (data) {//榜单页数据
      console.log(data)
        that.setData({
          topList: data.topList,//电台
        })
      }),
      util.getHotsear(function (data) {//热门搜索数据
        console.log(data)
        var hotkey = data.hotkey.slice(10,20);
        that.setData({
          hotkey: hotkey,//
          special_key: data.special_key
        })
      }),
    console.log(that.data)

    // if (app.songlist){
    //   this.setData({
    //     songPlayingList: app.songlist
    //   })
    // }

    this.history();//获取搜索历史
  },
  navTab:function(ev){//导航Tab
    var navcur = ev.currentTarget.dataset.id;
    this.setData({
      navcur:navcur
    })
  },
  inDetal:function(ev){//进入歌曲列表
    var id = ev.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '../detailed/detailed?id='+id
    })
  },
  /*搜索页面*/
  search:function(ev,value,id){//搜索结果,按下enter键时触发
    console.log(ev)
    var that=this;
    var keyword = value || ev.detail.value;
    if(ev){
      id=1;
    }
    that.setData({
      // searchList: []
      id: id,
      val:keyword,
      his:false
    })
    console.log(id)
    if(id!=1){
      util.getSearch(keyword, id, function (data) {
        console.log(data);
        console.log(that);
        var searchList = that.data.searchList.concat(data.data.song.list)
        that.setData({
          searchList: searchList
        })
      })
    }else{
      util.getSearch(keyword, id, function (data) {
        console.log(data);
        console.log(that)
        that.setData({
          searchList: data.data.song.list
        })
      })
      that.saveStor(keyword);
      
    }  
  },
  //存到本地
  saveStor:function(keyw){
    var arr = this.data.key;
    // wx.getStorage({
    //   key: 'key',
    //   success: function (res) {
    //     console.log(res.data)
    //     arr = res.data;
    //     console.log(arr)
    //   }
    // })
    console.log(arr)
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == keyw) {
        keyw = null;
      }
    }
    console.log(keyw)
    if (keyw) {
      arr.unshift(keyw);
      this.setData({
        key:arr
      })
      console.log(arr)
      wx.setStorage({
        key: "key",
        data: arr
      })
    }

  },
  // bindKeywordInput:function(ev){//有输入时触发
  //   console.log(ev)
    
  // },
  Handle:function(ev){//input获取焦点时触发
    console.log(ev)
    if (!this.data.searchKey){
      this.setData({
        his: true
      })
    }
    this.setData({
      searchKey: true
    })
    
    console.log(this)
  },
  inPlay: function (ev) {//搜索进入播放页面
    // console.log(app)
    var id = ev.currentTarget.dataset.id;
    console.log(id)
    app.songlist = this.data.searchList;
    this.setData({
      songPlayingList: app.songlist,
      songId:id
    })
    wx.navigateTo({
      url: '../play/play?id=' + id
    })
  },
// 点击标签
  binLabel:function(ev){
    console.log(ev);
    console.log(this)
    var id = ev.currentTarget.dataset.id;
    if(id==0)
    {
      var value = this.data.special_key;
    }else{
      --id;
      var value = this.data.hotkey[id].k;
    }
    console.log(value)
    this.search("",value,1);
    this.setData({
      searchKey: true
    })
  },
  //点击搜索历史
  binHist:function(ev){
    var id = ev.currentTarget.dataset.id;
    var value=this.data.key[id];
    // console.log(value)
    this.search('', value, 1)
  },
  //点击取消按钮
  binCancel:function(){
    console.log("qw")
    this.setData({
      searchList: "",
      searchKey: false,
      his:false
    })
  },
  //搜索历史
  history:function(){
    var that=this;
    wx.getStorage({
      key: 'key',
      success: function (res) {
        console.log(res.data)
        that.setData({
          key:res.data
        })
      }
    })
  },
  clear:function(){//清楚全部历史记录
    wx.setStorage({
      key: "key",
      data: []
    })
    this.setData({
      key:[]
    })
  },
  delet:function(ev){//删除某一条记录
    console.log(ev);
    var arr=this.data.key;
    var id = ev.currentTarget.dataset.id;
    arr.splice(id,1);
    this.setData({
      key:arr
    })
    wx.setStorage({
      key: "key",
      data: arr
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
  onReachBottom: function () {//上拉加载
    console.log(2)
    if (this.data.navcur != 2) {
      return;
    }
    console.log(1)
    var id=parseInt(this.data.id)+1;
    this.search('', this.data.val, id)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})