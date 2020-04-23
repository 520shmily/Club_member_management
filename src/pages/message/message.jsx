import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './message.scss'
import arrow from '../../static/images/arrow.jpg'

export default class Message extends Component {

  state = {
    isManageClicked: false,
    isClassYearClicked: false,
    isCollegeClicked: false,
    isQqClicked: false,
    isWechatClicked: false,
    isPhoneNumberClicked: false,
    isMemberPWClicked: false,
    messageArray: [],
    memberID: '',
  }

  componentWillMount () { }

  componentDidMount () {
    // this.handleRequest()
   }

  componentWillUnmount () { }

  componentDidShow () { 
    this.handleRequest()
  }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '个人信息'
  }

  handleRequest = () => {
     // 发送请求获取数据
     const that = this
     Taro.getStorage({
       key:'memberID',
       success: function (res) {
         Taro.request({
           url: 'https://www.swpuclub.cn/weChatlogin?username='+`"${res.data}"`, 
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
                   messageArray: requestData.data[0]
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

  handleManageClick = () => {
    this.setState({
      isManageClicked: true,
    })
    setTimeout(() => {
      this.setState({
        isManageClicked: false,
      })
      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/updateMessage/updateMessage?manage=' + this.state.messageArray.manage
        })
      }, 100)
    }, 200)
  }

  handleClassYearClick = () => {
    this.setState({
      isClassYearClicked: true,
    })
    setTimeout(() => {
      this.setState({
        isClassYearClicked: false,
      })
      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/updateMessage/updateMessage?classYear=' + this.state.messageArray.classYear
        })
      }, 100)
    }, 200)
  }

  handleCollegeClick = () => {
    this.setState({
      isCollegeClicked: true,
    })
    setTimeout(() => {
      this.setState({
        isCollegeClicked: false,
      })
      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/updateMessage/updateMessage?college=' + this.state.messageArray.college
        })
      }, 100)
    }, 200)
  }

  handleQqClick = () => {
    this.setState({
      isQqClicked: true,
    })
    setTimeout(() => {
      this.setState({
        isQqClicked: false,
      })
      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/updateMessage/updateMessage?qq=' + this.state.messageArray.qq
        })
      }, 100)
    }, 200)
  }

  handleWechatClick = () => {
    this.setState({
      isWechatClicked: true,
    })
    setTimeout(() => {
      this.setState({
        isWechatClicked: false,
      })
      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/updateMessage/updateMessage?wechat=' + this.state.messageArray.wechat
        })
      }, 100)
    }, 200)
  }

  handlePhoneNumberClick = () => {
    this.setState({
      isPhoneNumberClicked: true,
    })
    setTimeout(() => {
      this.setState({
        isPhoneNumberClicked: false,
      })
      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/updateMessage/updateMessage?phoneNumber=' + this.state.messageArray.phoneNumber
        })
      }, 100)
    }, 200)
  }

  handleMemberPWClick = () => {
    this.setState({
      isMemberPWClicked: true,
    })
    setTimeout(() => {
      this.setState({
        isMemberPWClicked: false,
      })
      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/updateMessage/updateMessage?memberPW=null'
        })
      }, 100)
    }, 200)
  }

  render () {
    const { messageArray, isManageClicked, isClassYearClicked, isCollegeClicked, isQqClicked, isWechatClicked, isPhoneNumberClicked, isMemberPWClicked } = this.state

    return (
      <View className='message'>
        <View className="messageItem">
          <Text className="messageTitle">姓名</Text>
          <View className="arrowItem">
            <Text className="messageContent">{messageArray.memberName == null ? '' : messageArray.memberName}</Text>
          </View>
        </View>
        <View className="messageItem">
          <Text className="messageTitle">会员编码</Text>
          <View className="arrowItem">
            <Text className="messageContent">{messageArray.memberID == null ? '' : messageArray.memberID}</Text>
          </View>
        </View>
        <View className="messageItem" onClick={this.handleManageClick} id={isManageClicked ? 'changeBackColor' : ''}>
          <Text className="messageTitle">专业</Text>
          <View className="arrowItem">
            <Text className="messageContent">{messageArray.manage == null ? '' : messageArray.manage}</Text>
            <Image className="messageArrow" src={arrow} mode='aspectFit' />
          </View>
        </View>
        <View className="messageItem" onClick={this.handleClassYearClick} id={isClassYearClicked ? 'changeBackColor' : ''}>
          <Text className="messageTitle">年级</Text>
          <View className="arrowItem">
            <Text className="messageContent">{messageArray.classYear == null ? '' : messageArray.classYear}</Text>
            <Image className="messageArrow" src={arrow} mode='aspectFit' />
          </View>
        </View>
        <View className="messageItem" onClick={this.handleCollegeClick} id={isCollegeClicked ? 'changeBackColor' : ''}>
          <Text className="messageTitle">学院</Text>
          <View className="arrowItem">
            <Text className="messageContent">{messageArray.college == null ? '' : messageArray.college}</Text>
            <Image className="messageArrow" src={arrow} mode='aspectFit' />
          </View>
        </View>
        <View className="messageItem" onClick={this.handleQqClick} id={isQqClicked ? 'changeBackColor' : ''}>
          <Text className="messageTitle">QQ</Text>
          <View className="arrowItem">
            <Text className="messageContent">{messageArray.qq == null ? '' : messageArray.qq}</Text>
            <Image className="messageArrow" src={arrow} mode='aspectFit' />
          </View>
        </View>
        <View className="messageItem" onClick={this.handleWechatClick} id={isWechatClicked ? 'changeBackColor' : ''}>
          <Text className="messageTitle">微信</Text>
          <View className="arrowItem">
            <Text className="messageContent">{messageArray.wechat == null ? '' : messageArray.wechat}</Text>
            <Image className="messageArrow" src={arrow} mode='aspectFit' />
          </View>
        </View>
        <View className="messageItem" onClick={this.handlePhoneNumberClick} id={isPhoneNumberClicked ? 'changeBackColor' : ''}>
          <Text className="messageTitle">电话</Text>
          <View className="arrowItem">
            <Text className="messageContent">{messageArray.phoneNumber == null ? '' : messageArray.phoneNumber}</Text>
            <Image className="messageArrow" src={arrow} mode='aspectFit' />
          </View>
        </View>
        <View className="messageItem" onClick={this.handleMemberPWClick} id={isMemberPWClicked ? 'changeBackColor' : ''}>
          <Text className="messageTitle">密码</Text>
          <View className="arrowItem">
            <Text className="messageContent">(点击修改)</Text>
            <Image className="messageArrow" src={arrow} mode='aspectFit' />
          </View>
        </View>
      </View>
    )
  }
}
