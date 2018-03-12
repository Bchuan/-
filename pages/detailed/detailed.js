var util = require("../../utils/util.js")
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that=this;
    var index=options.id;

    util.getDetailed(index,function(data){
      var c = data.color.toString(16);
      while (c.length < 6) {
        c = '0' + c;
      }
      that.setData({
          detal:data,
          color:'#'+c
      })
    })
    console.log(that.data)
  },

  inPlay:function(ev){//进入播放页面
    // console.log(app)
    var id = ev.currentTarget.dataset.id;
    console.log(id)
    app.songlist=this.data.detal.songlist;
    wx.navigateTo({
      url: '../play/play?id=' + id
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