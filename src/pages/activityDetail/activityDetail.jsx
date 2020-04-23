import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './activityDetail.scss'
import img from '../club/timg.jpeg'
import { AtForm, AtSwitch, AtButton, AtTextarea, AtFloatLayout, AtModal, AtModalContent, AtModalAction, AtToast } from 'taro-ui'

import { ThinksList } from '../../components/thinksList/index'

export default class Activitydetail extends Component {

  state = {
    ishaveThinksList: false,
    isHavaThinksView: false,
    isSignUpBtnAble: false,
    isThinksBtnAble: false,
    isThinksOpend: false,
    isSignInChecked: false,
    isSignOffChecked: false,
    isSignInDisabled: true,
    isSignOffDisabled: true,
    isSignUp: false,
    btnTitle: '点击报名',
    signIn: '签到',
    signOff: '签退',
    activitythinks: '',
    activityDetail: {},
    thinksList:[],
    memberID: '',
    clubID: '',
    activityID: '',
    memberName: '',
    isSignUpSuccuse: false, 
    isSignUpOpened: false,
  }

  componentWillMount () { }

  componentDidMount () { 
    const that = this
    const params = this.$router.params;
    
    Taro.getStorage({
      key:'memberName',
      success: function (res) {
          that.setState({
            memberName: res.data,
          })
      }
    })

    // 获取会员编码
    Taro.getStorage({
      key:'memberID',
      success: function (res) {
          that.setState({
            memberID: res.data,
            clubID: res.data.split('-')[0],
            activityID: params.activityID,
            clubActivity: params.clubActivity
          })
      }
    })
    // 获取报名状态
    Taro.request({
      url: 'https://www.swpuclub.cn/weChatIsSignUp?activityID='+params.activityID, 
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
              isSignUp: requestData.data[0].isSignUp === 'true',
              btnTitle: requestData.data[0].isSignUp == 'true' ? '已报名' : '点击报名',

              isSignInChecked: requestData.data[0].signIn === 'true',
              signIn: requestData.data[0].signIn === 'true' ? '已签到' : '签到',
              isSignInDisabled: requestData.data[0].signIn === 'true',

              isSignOffChecked: requestData.data[0].signOff === 'true',
              isSignOffDisabled: requestData.data[0].signOff === 'true',
              signOff: requestData.data[0].signOff === 'true' ? '已签退' : '签退',
            })
          } 
        } else {
          console.log(res.errMsg)
        }
      }
    })

    // 请求活动数据
    Taro.request({
      url: 'https://www.swpuclub.cn/weChatActivityDetail?activityID='+params.activityID, 
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.statusCode === 200) {
          const requestData = res.data;
          that.setState({
            activityDetail: requestData.data[0],
          })

          that.compareTime(requestData.data[0].activityTime, requestData.data[0].activityStopTime)
        } else {
          console.log(res.errMsg)
        }
      }
    })

    that.requestThinks(params.activityID) // 请求活动评论
  }

  componentWillUnmount () { }

  componentDidShow () {
    this.compareTime(this.state.activityDetail.activityTime, this.state.activityDetail.activityStopTime)
    this.requestThinks(this.state.activityID)  
   }

  componentDidHide () { }

  //  监听用户下拉刷新
  onPullDownRefresh() {
    this.compareTime(this.state.activityDetail.activityTime, this.state.activityDetail.activityStopTime)
    this.requestThinks(this.state.activityID) 
    Taro.stopPullDownRefresh()
  }

  config = {
    navigationBarTitleText: '活动详情页',
    enablePullDownRefresh: true,
  }

  // 请求活动评
  requestThinks = (activityID) => {
    const that = this
    // 请求活动评论
    Taro.request({
      url: 'https://www.swpuclub.cn/weChatGetThinks?activityID='+activityID, 
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
              thinksList: requestData.data,
              ishaveThinksList: false
            })
          } else {
            that.setState({
              ishaveThinksList: true
            })
          }
        } else {
          console.log(res.errMsg)
        }
      }
    })
  }

  // 计算时间差设置报名按钮，签到，签退按钮的状态
  compareTime = (activityTime, activityStopTime) => {
    let nowDate = new Date().getTime();
    let activityDate = new Date(activityTime).getTime();
    let activityStopDate = new Date(activityStopTime).getTime();
    // 可以报名
    if (activityDate - nowDate >= 43200000) { 
      this.setState({
        isSignUpBtnAble: true
      }) 
    } else {
      // 不可以报名
      this.setState({
        isSignUpBtnAble: false
      }) 

      // 可以签到
      if (!this.state.isSignUp && (activityDate - nowDate <= 600000) || (nowDate > activityDate && nowDate - activityDate <= 1200000)) {
        this.setState({
          isSignInDisabled: false
        })
      } else {
        this.setState({
          isSignInDisabled: true
        })
      }
      // 可以签退
      if (!this.state.isSignUp && (activityStopDate - nowDate <= 600000) || (nowDate > activityStopDate && nowDate - activityStopDate <= 1200000)) {
        this.setState({
          isSignOffDisabled: false
        })
      } else {
        this.setState({
          isSignOffDisabled: true
        })
      }
      // 可以评论
      if (activityStopDate - nowDate <= 0) {
        this.setState({
          isHavaThinksView: true
        })
      }
    }
  }

  // 点击签到按钮
  handleSignInChange = isSignInChecked => {
    this.setState({ 
      isSignInChecked,
      signIn: isSignInChecked ? '已签到' : '签到',
      isSignInDisabled: true
    })
    // 更新签到状态
    Taro.request({
      url: 'https://www.swpuclub.cn/weChatSignUp?signIn=true'+'&activityID='+this.state.activityID,
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.statusCode === 200) {
          console.log(res.errMsg)
        } else {
          console.log(res.errMsg)
        }
      }
    })
  }

  // 点击签退按钮
  handleSignOffChange = isSignOffChecked => {
    this.setState({ 
      isSignOffChecked,
      signOff: isSignOffChecked ? '已签退' : '签退',
      isSignOffDisabled: true
    })
    // 更新签退状态
    Taro.request({
      url: 'https://www.swpuclub.cn/weChatSignUp?signOff=true'+'&activityID='+this.state.activityID,
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.statusCode === 200) {
          console.log(res.errMsg)
        } else {
          console.log(res.errMsg)
        }
      }
    })
  }

  // 点击报名按钮
  handleBtnClick = () => {
    const that = this

    let isSignUp = !this.state.isSignUp
    const { memberID, clubID, activityID, activityDetail, memberName } = this.state
    this.setState({
      isSignUp: isSignUp,
      btnTitle: !isSignUp ? '点击报名' : '已报名',
    })

    // 更新报名状态
    Taro.request({
      url: 'https://www.swpuclub.cn/weChatSignUp?isSignUp='+isSignUp+'&memberID='+
      memberID+'&clubID='+clubID+'&activityID='+activityID+
      '&clubActivity='+activityDetail.clubActivity+'&memberName='+memberName, 
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.statusCode === 200) {
          if (res.data.code === 0) {
            that.setState({
              isSignUpOpened: true,
            })
          } else {
            that.setState({
              isSignUpSuccuse: true
            })
            setTimeout(() => {
              that.setState({
                isSignUpSuccuse: false
              })
            }, 2000)
          }
        } else {
          console.log(res.errMsg)
        }
      }
    })
  }

  //  取消按钮
  handleSignUpCancel = () => {
    let isSignUp = !this.state.isSignUp
    let activityID = this.state.activityID

    this.setState({
      isSignUpOpened: false,
      btnTitle: !this.state.isSignUpOpened ? '点击报名' : '已报名',
      isSignUp: true
    })

    // 发送请求更新数据库的状态
    Taro.request({
      url: 'https://www.swpuclub.cn/weChatSignUp?isSignUp='+isSignUp+'&activityID='+activityID,
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.statusCode === 200) {
          console.log(res.errMsg)
        } else {
          console.log(res.errMsg)
        }
      }
    })
  }

  // 确定按钮
  handleSignUpConfirm = () => {
    this.setState({
      isSignUpOpened: false,
      btnTitle: this.state.isSignUpOpened ? '点击报名' : '已报名',
      isSignUp: false,
    })
  }

  // 根据评论框的值修改状态
  handleThinksChange = (event) => {
    this.setState({
      activitythinks: event.target.value
    })
    if (event.target.value) {
      this.setState({
        isThinksBtnAble: true
      })
    } else {
      this.setState({
        isThinksBtnAble: false
      })
    }
  }

  // 弹出评论框
  handleWriteClick = () => {
    this.setState({
      isThinksOpend: true,
      activitythinks: ''
    })
  }

  // 关闭评论框
  handleAtFloatLayoutClose = () => {
    this.setState({
      isThinksOpend: false,
    })
  }
 
  // 提交评论
  handleThinksUpClick = () => {
    // 更新签到状态
    Taro.request({
      url: 'https://www.swpuclub.cn/weChatSignUp?activitythinks='+this.state.activitythinks+'&activityID='+this.state.activityID,
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if(res.statusCode === 200) {
          console.log(res.errMsg)
        } else {
          console.log(res.errMsg)
        }
      }
    })
    // 请求活动评论
    setTimeout(() => {
      this.requestThinks(this.state.activityID)
    },1000)
    this.setState({
      isThinksOpend: false,
      isThinksBtnAble: false,
      activitythinks: ''
    })
  }

  render () {
    const { isSignUpSuccuse, isSignUpOpened, activityDetail, ishaveThinksList, isHavaThinksView, isSignUpBtnAble, isThinksBtnAble, isThinksOpend, thinksList, activitythinks, clubActivity, btnTitle, signIn, signOff, isSignInChecked, isSignOffChecked, isSignInDisabled, isSignOffDisabled} = this.state

    let thinksListElement = thinksList.map((item) => {
      return <ThinksList nickname={item.memberID} activitythinks={item.activitythinks}></ThinksList>
    })

    let noneThinksListElement = <Text className="noActivitythinks">暂时还没有评论哦～</Text>

    return (
      <View className='activityDetail'>
        <AtToast 
          isOpened={isSignUpSuccuse} 
          text="报名成功" duration={2000}></AtToast>
        <AtModal isOpened={isSignUpOpened}>
          <AtModalContent className="modalContent">确定取消报名？</AtModalContent>
          <AtModalAction> 
            <Button onClick={this.handleSignUpConfirm}>确定</Button> 
            <Button onClick={this.handleSignUpCancel}>取消</Button> 
          </AtModalAction>
        </AtModal>
        <View className='at-article'>
          <Image 
              className='at-article__img activityP' 
              src={activityDetail.activityImg} 
              mode='aspectFit' 
              />
          <View className='at-article__h1 avtivityTitle'>
            {activityDetail.clubActivity}
          </View>
          <View className='at-article__content'>
            <View className='at-article__section'>
              <View className='at-article__h3'>活动简介</View>
              <View className='at-article__p'>
                {activityDetail.activityIntroduce}
              </View>
              <View className='at-article__h3'>活动要求</View>
              <View className='at-article__p'>
                {activityDetail.activityRequire === null ? '无' : activityDetail.activityRequire}
              </View>
              <View className='at-article__h3'>活动开始时间</View>
              <View className='at-article__p'>
                {activityDetail.activityTime}
              </View>
              <View className='at-article__h3'>活动结束时间</View>
              <View className='at-article__p'>
                {activityDetail.activityStopTime}
              </View>
              <View className='at-article__h3'>活动地点</View>
              <View className='at-article__p'>
                {activityDetail.activitySite}
              </View>
            </View>
          </View>
        </View>
        <View className="messageContent">
          <AtButton onClick={this.handleBtnClick} disabled={!isSignUpBtnAble} className={isSignUpBtnAble ? 'thinksBtnable' : 'thinksBtndisable'}>{btnTitle}</AtButton>
          <AtForm>
            <AtSwitch title={signIn} disabled={isSignInDisabled} checked={isSignInChecked} onChange={this.handleSignInChange}/>
            <AtSwitch title={signOff} disabled={isSignOffDisabled} checked={isSignOffChecked} onChange={this.handleSignOffChange} />
          </AtForm>
          <Text className="tipsMessage">提示：活动开始前十分钟可签到，结束前十分钟可签退，签到签退均持续30分钟，结束后发表活动评论，下拉刷新可更新状态</Text>
          <View className={isHavaThinksView ? '' : 'allActivityThinks'}>
            <Text className="thinksItems">活动评论</Text>
            <Text className="thinksItems writeThinks" onClick={this.handleWriteClick}>写评论</Text>
            {ishaveThinksList ? noneThinksListElement : thinksListElement}
            <Text className="fengexian">______ . ______</Text>
            <AtFloatLayout isOpened={isThinksOpend}>
              <View className="writeBox">
                <Text onClick={this.handleAtFloatLayoutClose}>取消</Text>
                <Text >写评论</Text>
                <AtButton 
                  size='small' 
                  id="thinksBtn" 
                  disabled={!isThinksBtnAble} 
                  className={isThinksBtnAble ? 'thinksBtnable' : 'thinksBtndisable'} 
                  onClick={this.handleThinksUpClick} >
                  提交
                </AtButton>
              </View>
              <AtTextarea
                className="AtTextarea"
                count={false}
                value={activitythinks}
                onChange={this.handleThinksChange}
                maxLength={200}
                placeholder='写下你的活动评论...'
                height={300}
              />
            </AtFloatLayout>
          </View>
        </View>
      </View>
    )
  }
}
