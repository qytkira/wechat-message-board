const db = wx.cloud.database()
const messages = db.collection('messages').orderBy('date', 'desc')
var mydata = new Array

Page({
  data:{
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    isLiked: false,
    isFold: true,
    dataset: []
  },
  onLoad: function () {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    })

    messages.where({}).get({
      success: res=>{
        mydata = res.data
        for(var i = 0; i < mydata.length; i++){
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
        }
        this.setData({
          dataset: mydata
        })
      }
    })
  },

  onPullDownRefresh: function () {
    messages.where({}).get({
      success: res => {
        mydata = res.data
        for (var i = 0; i < mydata.length; i++) {
          var timeSpace = this.getTime(Date.parse(mydata[i].date))
          mydata[i].date = timeSpace
        }
        this.setData({
          dataset: mydata
        })
      }
    })
    wx.stopPullDownRefresh()
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  tapLike(e){
    this.setData({
      isLiked: !this.data.isLiked,
    })
  },
  showComment(e){
    this.setData({
      isFold: !this.data.isFold,
    })
  },

  getTime: function (date1) {
    var date2 = new Date();
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var time = timestamp - date1 / 1000;
    var day = Math.floor(time / 86400);
    var hour = Math.floor(time % 86400 / 3600);
    var minute = Math.floor(time % 86400 % 3600 / 60);
    //console.log(day, hour, minute)
    var output = '';
    if (day != 0) {
      output = day + ' day ago';
    } else if (day == 0 && hour != 0) {
      output = hour + ' hour ago';
    } else if (day == 0 && hour == 0 && minute != 0) {
      output = minute + ' minutes ago';
    }
    return output
  }
})