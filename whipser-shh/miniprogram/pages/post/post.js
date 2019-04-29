// pages/post/post.js
const db = wx.cloud.database()
const userInfo = db.collection('userInfo')
var tags = new Array()

Page({

  /**
   * Page initial data
   */
  data: {
    openid: '',
    message: '',
    nickName: '',
    imgUrl: '/images/picture-white.png'
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        this.setData({
          openid: res.result.openid
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  handleMessage: function(event){
    this.setData({
      message: event.detail.value
    })
  },
  
  handleNickName: function(event){
    this.setData({
      nickName: event.detail.value
    })
  },

  love: function(event){
    tags.push("Love")
  },

  life: function (event) {
    tags.push("life")
  },

  game: function (event) {
    tags.push("game")
  },

  study: function (event) {
    tags.push("study")
  },

  uploadPic: function(event){
    wx.chooseImage({
      success: res => {
        const tempFilePath = res.tempFilePaths[0]
        this.setData({
          imgUrl: tempFilePath
        })
      },
    })
  },

  leaveMessage: function(event){
    if(this.data.message && this.data.nickName){
      wx.showLoading({
        title: 'sending',
      })
      wx.cloud.uploadFile({
        cloudPath: this.data.openid + Math.floor(Math.random() * 10000000)+ '.jdg',
        filePath: this.data.imgUrl,
        success: res => {
          wx.cloud.callFunction({
            name: 'leaveMessage',
            data: {
              openid: this.data.openid,
              message: this.data.message,
              nickName: this.data.nickName,
              imgUrl: res.fileID
            },
            complete: res => {
              console.log(res)
              wx.hideLoading()
            }
          })
        },
        fail: console.error
      })
    }else{
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
      })
    }
  }
})