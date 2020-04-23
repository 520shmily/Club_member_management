import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, SwiperItem, Swiper, Image } from '@tarojs/components'
import { AtSearchBar, AtTabs, AtTabsPane, AtToast} from 'taro-ui'
import './activity.scss'
import { IsSignOff } from '../../components/isSignOff/index'
import { ActivityList } from '../../components/activityList/index'
import img from '../club/timg.jpeg'

export default class Activity extends Component {

  state = {
    current: 0,
    isSignOff: false,
    clubID: '',
    activityID: '',
    searchValue: '',
    isSearch: '',
    isSearchTips: '',
    signUpActivityList: [],
    listData: [],
    // signUpActivityList: [{
    //   clubActivity: '活动一',
    //   isSignUp: false
    // },{
    //   clubActivity: '活动二',
    //   isSignUp: false
    // },{
    //   clubActivity: '活动三',
    //   isSignUp: false
    // },{
    //   clubActivity: '活动四',
    //   isSignUp: false
    // },{
    //   clubActivity: '活动五',
    //   isSignUp: false
    // },{
    //   clubActivity: '活动六思学楼A301',
    //   isSignUp: false
    // },{
    //   clubActivity: '活动七',
    //   isSignUp: false
    // },{
    //   clubActivity: '活动八',
    //   isSignUp: false
    // }]
  }

  componentWillMount () { }

  componentDidMount () { 
    const that = this

    Taro.getStorage({
      key:'isSignOff',
      success: function (res) {
        that.setState({
          isSignOff: res.data
        })
      }
    })

    Taro.getStorage({
      key:'memberID',
      success: function (res) {
        // 请求我参与的活动数据
        Taro.request({
          url: 'https://www.swpuclub.cn/weChatIsAllSignUp?memberID='+`"${res.data}"`, 
          data: {
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            if(res.statusCode === 200) {
              const requestData = res.data;
              if (requestData.code === 1) {
                that.setState({
                  signUpActivityList: requestData.data,
                })
              } 
            } else {
              console.log(res.errMsg)
            }
          }
        })
      }
    })

    const params = this.$router.params;
    // 请求活动数据
    Taro.request({
      url: 'https://www.swpuclub.cn/weChatActivityList?clubID='+`"${params.clubID}"`, 
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.statusCode === 200) {
          const requestData = res.data;
          that.setState({
            listData: requestData.data,
          })
        } else {
          console.log(res.errMsg)
        }
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { 
    const that = this
    Taro.getStorage({
      key:'isSignOff',
      success: function (res) {
        that.setState({
          isSignOff: res.data
        })
      }
    })
  }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '会员之家-活动'
  }

  handleActivityClick (activityID,e) {
    Taro.navigateTo({
      url: '/pages/activityDetail/activityDetail?activityID=' + activityID
    })
  }

  onChange = (searchValue) => {
    this.setState({
      searchValue: searchValue
    })
  }
  onActionClick = () => {
    const searchValue = this.state.searchValue
    const dataArray = this.state.listData

    dataArray.forEach((item) => {
      if(item.clubActivity === searchValue) {
        this.setState({
          current: 0,
          isSearch: searchValue,
          isSearchTips: searchValue
        })
      } else {
        this.setState({
          isSearchTips: 'show'
        })
      }
    })

    setTimeout(() => {
      this.setState({
        searchValue: '',
        isSearchTips: ''
      })
    }, 2200)
    
  }

  handleClick (value) {
    this.setState({
      current: value,
      isSearch: '',
    })
  }


  render () {
    const tabList = [{ title: '所有活动' }, { title: '进行中活动' }, { title: '历史活动' }]
    const scrollTop = 0
    const { isSearchTips, isSignOff, listData, searchValue, isSearch, signUpActivityList, current } = this.state

    // 计算时间
    const compareTime = (activityTime, activityStopTime) => {
      let nowDate = new Date().getTime();
      let activityDate = new Date(activityTime).getTime();
      let activityStopDate = new Date(activityStopTime).getTime();

      if (activityDate - nowDate >= 43200000) { 
        return 0
      } else {
        if (activityStopDate < nowDate) {
          return 1
        }

        return 2
      } 
    }

    // 所有活动
    let allActivityList = listData.map((item) => {
      let isJion = '';
      if (signUpActivityList.length === 0) {
        if(compareTime(item.activityTime, item.activityStopTime) === 1) {
          isJion = '活动已结束'
        } else if (compareTime(item.activityTime, item.activityStopTime) === 2) {
          isJion = '活动已停止报名～'
        } else {
          isJion = '活动正在报名中～'
        }
      } else {
        signUpActivityList.map((element) => {
          if (element.activityID === item.activityID.toString() && element.isSignUp === "true") {
            if(compareTime(item.activityTime, item.activityStopTime) === 1) {
              isJion = '活动已结束，快去参与活动评论吧～'
            } else {
              isJion = '你已报名该活动，记得参加哦～'
            }
          } else {
            if(compareTime(item.activityTime, item.activityStopTime) === 1) {
              isJion = '活动已结束'
            } else if (compareTime(item.activityTime, item.activityStopTime) === 2) {
              isJion = '活动已停止报名～'
            } else {
              isJion = '活动正在报名中～'
            }
          }
        })
      }
      return  <ActivityList 
                id={isSearch !== '' ? (isSearch ===  item.clubActivity ? '' : 'show') : ''}
                clubActivity={item.clubActivity}
                activityTime={item.activityTime} 
                activityStopTime={item.activityStopTime}
                activitySite={item.activitySite}
                activityImg={item.activityImg} 
                handleClick={this.handleActivityClick.bind(this, item.activityID)}
                isJion={isJion}
                >
                </ActivityList>
    })
    // 历史活动
    let ActivitiedList = listData.map((item) => {
      let isJion = '';
      if (signUpActivityList.length === 0) {
        if(compareTime(item.activityTime, item.activityStopTime) === 1) {
          isJion = '活动已结束'
        } else if (compareTime(item.activityTime, item.activityStopTime) === 2) {
          isJion = '活动已停止报名～'
        } else {
          isJion = '活动正在报名中～'
        }
      } else {
        signUpActivityList.map((element) => {
          if (element.activityID === item.activityID.toString() && element.isSignUp === "true") {
            if(compareTime(item.activityTime, item.activityStopTime) === 1) {
              isJion = '活动已结束，快去参与活动评论吧～'
            } else {
              isJion = '你已报名该活动，记得参加哦～'
            }
          } else {
            if(compareTime(item.activityTime, item.activityStopTime) === 1) {
              isJion = '活动已结束'
            } else if (compareTime(item.activityTime, item.activityStopTime) === 2) {
              isJion = '活动已停止报名～'
            } else {
              isJion = '活动正在报名中～'
            }
          }
        })
      }
      if(compareTime(item.activityTime, item.activityStopTime) === 1) {
        return  <ActivityList 
              clubActivity={item.clubActivity}
              activityTime={item.activityTime} 
              activityStopTime={item.activityStopTime}
              activitySite={item.activitySite}
              activityImg={item.activityImg} 
              handleClick={this.handleActivityClick.bind(this, item.activityID)}
              isJion={isJion}
              >
              </ActivityList>
      }
    })
    // 当前活动
    let ActivitingList = listData.map((item) => {
      let isJion = '';
      if (signUpActivityList.length === 0) {
        if(compareTime(item.activityTime, item.activityStopTime) === 1) {
          isJion = '活动已结束'
        } else if (compareTime(item.activityTime, item.activityStopTime) === 2) {
          isJion = '活动已停止报名～'
        } else {
          isJion = '活动正在报名中～'
        }
      } else {
        signUpActivityList.map((element) => {
          if (element.activityID === item.activityID.toString() && element.isSignUp === "true") {
            if(compareTime(item.activityTime, item.activityStopTime) === 1) {
              isJion = '活动已结束，快去参与活动评论吧～'
            } else {
              isJion = '你已报名该活动，记得参加哦～'
            }
          } else {
            if(compareTime(item.activityTime, item.activityStopTime) === 1) {
              isJion = '活动已结束'
            } else if (compareTime(item.activityTime, item.activityStopTime) === 2) {
              isJion = '活动已停止报名～'
            } else {
              isJion = '活动正在报名中～'
            }
          }
        })
      }
      if(compareTime(item.activityTime, item.activityStopTime) === 0 || compareTime(item.activityTime, item.activityStopTime) === 2) {
        return  <ActivityList
              clubActivity={item.clubActivity}
              activityTime={item.activityTime} 
              activityStopTime={item.activityStopTime}
              activitySite={item.activitySite}
              activityImg={item.activityImg} 
              handleClick={this.handleActivityClick.bind(this, item.activityID)}
              isJion={isJion}
              >
              </ActivityList>
      }
    })

    return (
      <View>
        <AtToast isOpened={(isSearchTips !== '') ? (isSearch === searchValue ? false : true) : (isSearchTips === 'show') ? true : false} text="没有搜索到该活动，请确认活动名称是否输入正确" duration={2000}></AtToast>
        <View id={isSignOff ? 'show' : ''} className="activityList">
          <View className="navbar">
            <AtSearchBar
              actionName='搜一下'
              value={searchValue}
              onChange={this.onChange}
              onActionClick={this.onActionClick}
              className="search"
              placeholder='输入活动名称搜索活动'
            />
            <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this)}>
              <AtTabsPane current={current} index={0} >
              <ScrollView
                className="scrollview"
                scrollY
                scrollWithAnimation
                scrollTop={scrollTop}
              >
                <View>{allActivityList}</View>
                <View className="placeholder">社团还没有发布更多活动哦～</View>
              </ScrollView>
              </AtTabsPane>
              <AtTabsPane current={current} index={1}>
                <ScrollView
                  className="scrollview"
                  scrollY
                  scrollWithAnimation
                  scrollTop={scrollTop}

                >
                  <View>{ActivitingList}</View>
                  <View className="placeholder">社团还没有历史活动哦～</View>
                </ScrollView>
              </AtTabsPane>
              <AtTabsPane current={current} index={2}>
                <ScrollView
                  className="scrollview"
                  scrollY
                  scrollWithAnimation
                  scrollTop={scrollTop}

                >
                  <View>{ActivitiedList}</View>
                  <View className="placeholder">社团还没有发布更多活动哦～</View>
                </ScrollView>
              </AtTabsPane>
            </AtTabs>
          </View>
        </View>
        <View className="isSignOff" id={isSignOff ? '' : 'show'}>
          <IsSignOff></IsSignOff>
        </View>
      </View>
    )
  }
}
