function getRecom(callback) {//获取推荐
  wx.request({
    url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      // console.log(res.data)
      callback(res.data.data);
    }
  })
}
function getTopLi(callback) {//获取榜单
  wx.request({
    url: 'https://szc.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res.data)
      callback(res.data.data);
    }
  })
}


function getDetailed(id, callback) {//获取榜单列表
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      tpl: 3,
      page: 'detail',
      type: 'top',
      topid: id
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res.data)
      callback(res.data);
    }
  })
}


function getSearch(keyword,id,callback) {//搜索
  wx.request({
    url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      w: keyword,
      zhidaqu: 1,
      catZhida: 1,
      t: 0,
      flag: 1,
      ie: 'utf - 8',
      sem: 1,
      aggr: 0,
      perpage: 20,
      n: 20,
      p: id,
      remoteplace: 'txt.mqq.all'
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res.data)
      callback(res.data);
    }
  })
}
function getHotsear(callback) {//获取热门搜索
  wx.request({
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', //仅为示例，并非真实的接口地址
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf - 8',
      outCharset: 'utf - 8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res.data)
      callback(res.data.data);
    }
  })
}
module.exports = {
  getRecom: getRecom,//推荐页数据
  getTopLi: getTopLi,
  getDetailed: getDetailed,
  getSearch: getSearch,
  getHotsear: getHotsear
}