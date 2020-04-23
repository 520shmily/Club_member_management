import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import './myActivity.scss'
import { AtSearchBar, AtTabs, AtTabsPane} from 'taro-ui'
import { MyActivityList } from '../../components/myActivityList/index'

export default class Myactivity extends Component {

  state = {
    current: 0,
    myActivityList:[],
  }

  componentWillMount () { }

  componentDidMount () {
    // 发送活动请求
    const that = this
    Taro.getStorage({
      key:'memberID',
      success: function (res) {
        Taro.request({
          url: 'https://www.swpuclub.cn/weChatMyOnlyActivity?username='+`"${res.data}"`, 
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
                  myActivityList: requestData.data
                })
                return;
              } 
            } else {
              console.log(res.errMsg)
            }
          }
        })
      }
    })
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '我的活动'
  }

  handleClick (value) {
    this.setState({
      current: value,
    })
  }

  render () {
    const tabList = [{ title: '全部活动' },{ title: '有效活动' }, { title: '无效活动' }]
    const scrollTop = 0
    const { current, myActivityList } = this.state

    let youxiaoList = myActivityList.map((item) => {
      if(item.signIn == 'true' && item.signOff == 'true') {
       return <MyActivityList 
          signIn="已签到"
          signOff="已签退"
          pinglun={item.activitythinks}
          huodong={item.clubActivity}
          zhuangtai="有效活动"
        ></MyActivityList>
      } 
    })
    let wuxiao = myActivityList.map((item) => {
      if (item.signIn !== 'true' && item.signOff == 'true') {
        return <MyActivityList 
           signIn="未签到"
           signOff="已签退"
           pinglun={item.activitythinks}
           huodong={item.clubActivity}
           zhuangtai="无效活动"
         ></MyActivityList>
       } 
    })
    
    let wuxiaohuodonglist = myActivityList.map((item) => {
      if (item.signIn == 'true' && item.signOff !== 'true') {
        return <MyActivityList 
           signIn="已签到"
           signOff="未签退"
           pinglun={item.activitythinks}
           huodong={item.clubActivity}
           zhuangtai="无效活动"
         ></MyActivityList>
       } 
    }) 

    let weicanyulist = myActivityList.map((item) => {
      if(item.signIn !== 'true' && item.signOff !== 'true') {
        return <MyActivityList 
          signIn="未签到"
          signOff="未签退"
          pinglun={item.activitythinks}
          huodong={item.clubActivity}
          zhuangtai="无效活动"
        ></MyActivityList>
      }
    }) 
    

    return (
      <View className='myActivity'>
        <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={current} index={0} >
            <ScrollView
              className="scrollview"
              scrollY
              scrollWithAnimation
              scrollTop={scrollTop}
            >
              <View>{youxiaoList}{wuxiao}{wuxiaohuodonglist}{weicanyulist}</View>
              <View className="placeholder">没有更多已报名的活动</View>
            </ScrollView>
          </AtTabsPane>
          <AtTabsPane current={current} index={1} >
            <ScrollView
              className="scrollview"
              scrollY
              scrollWithAnimation
              scrollTop={scrollTop}
            >
              <View>{youxiaoList}</View>
              <View className="placeholder">没有更多有效的活动</View>
            </ScrollView>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <ScrollView
              className="scrollview"
              scrollY
              scrollWithAnimation
              scrollTop={scrollTop}
            >
              <View>{wuxiao}{wuxiaohuodonglist}{weicanyulist}</View>
              <View className="placeholder">没有更多无效的活动</View>
            </ScrollView>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
