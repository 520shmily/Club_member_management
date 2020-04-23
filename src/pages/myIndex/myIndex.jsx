import Taro, { Component } from '@tarojs/taro'
import { View, Text, OpenData, Button } from '@tarojs/components'
import './myIndex.scss'
import { AtAvatar, AtList, AtListItem, AtButton, AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui'
import avatar from '../myIndex/avatar.jpg'

export default class Myindex extends Component {

  state = {
    memberName: '',
    Opene: false,
    isSignOff: false
  }

  componentWillMount () { }

  componentDidMount () {
    // const that = this
    // Taro.getStorage({
    //   key:"memberName",
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setState({
    //       memberName: res.data
    //     })
    //   }
    // })

   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '会员之家-我的'
  }

  handleRequestClick = () => {
    const { isSignOff } = this.state
    if(isSignOff) {
      Taro.navigateTo({
        url: '/pages/isSignOff/isSignOff'
      })
      return
    }
    Taro.navigateTo({
      url: '/pages/request/request'
    })
  }

  handleActivityClick = () => {
    const { isSignOff } = this.state
    if(isSignOff) {
      Taro.navigateTo({
        url: '/pages/isSignOff/isSignOff'
      })
      return
    }
    Taro.navigateTo({
      url: '/pages/myActivity/myActivity'
    })
  }

  handleEvaluateClick = () => {
    const { isSignOff } = this.state
    if(isSignOff) {
      Taro.navigateTo({
        url: '/pages/isSignOff/isSignOff'
      })
      return
    }
    Taro.navigateTo({
      url: '/pages/evaluate/evaluate'
    })
  }

  handleMessageClick = () => {
    const { isSignOff } = this.state
    if(isSignOff) {
      Taro.navigateTo({
        url: '/pages/isSignOff/isSignOff'
      })
      return
    }
    Taro.navigateTo({
      url: '/pages/message/message'
    })
  }

  handleSuggestClick = () => {
    const { isSignOff } = this.state
    if(isSignOff) {
      Taro.navigateTo({
        url: '/pages/isSignOff/isSignOff'
      })
      return
    }
    Taro.navigateTo({
      url: '/pages/suggest/suggest'
    })
  }

  handleBtnClick = () => {
    this.setState({
      Opene: true,
    })
  }

  handleCancel = () => {
    this.setState({
      Opene: false,
    })
  }

  handleConfirm = () => {
    this.setState({
      Opene: false,
      isSignOff: true,
    })
  }

  handleSignIn = () => {
    Taro.navigateTo({
      url: '/pages/login/login'
    })
  }

  render () {
    const { memberName, Opene, isSignOff } = this.state
    Taro.setStorage({
      key:'isSignOff',
      data:isSignOff
    })
    return (
      <View className='myIndex'>
        <View className="myavatar" id={isSignOff ? 'show' : ''}>
          <OpenData className='Avatar' type='userAvatarUrl'></OpenData>
          <Text className="myName">韦德鑫</Text>
        </View>
        <View className="myavatar" id={isSignOff ? '' : 'show'}>
          <AtAvatar image={avatar}></AtAvatar>
          <Text className="myName" onClick={this.handleSignIn}>登录</Text>
        </View>
        <View className="mymessage">
          <AtList>
            {/* <AtListItem title='我的通知' onClick={this.handleRequestClick} arrow='right' extraText='查看全部通知'/> */}
            <AtListItem title='我的活动' onClick={this.handleActivityClick} arrow='right' extraText='查看全部活动'/>
            <AtListItem title='我的考评' onClick={this.handleEvaluateClick} arrow='right' />
            <AtListItem title='个人信息' onClick={this.handleMessageClick} arrow='right' />
            <AtListItem title='建议反馈' onClick={this.handleSuggestClick} arrow='right' />
          </AtList>
        </View>
        <View className="btnItem" onClick={this.handleBtnClick} id={isSignOff ? 'show' : ''}>
          <AtButton className="exitBtn">退出登录</AtButton>
        </View>
        <AtModal isOpened={Opene}>
          <AtModalContent className="modalContent">是否退出登录？</AtModalContent>
          <AtModalAction> 
            <Button onClick={this.handleCancel}>取消</Button> 
            <Button onClick={this.handleConfirm}>确定</Button> 
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
