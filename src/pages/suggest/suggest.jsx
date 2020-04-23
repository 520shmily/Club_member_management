import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './suggest.scss'
import { AtButton, AtTextarea, AtToast } from 'taro-ui'

export default class Suggest extends Component {

  state = {
    activitythinks: '',
    isSignUpBtnAble: false,
    isTipsOpened: false,
    memberName: ''
  }

  componentWillMount () { }

  componentDidMount () {
    const that = this
    Taro.getStorage({
      key:'memberName',
      success: function (res) {
        that.setState({
          memberName: res.data
        })
      }
    })
   }

  componentWillUnmount () { }

  componentDidShow () {
    this.setState({
      activitythinks: '',
    })
   }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '建议反馈'
  }

  handleTipsChange = (event) => {
    this.setState({
      activitythinks: event.target.value
    })
    if (event.target.value) {
      this.setState({
        isSignUpBtnAble: true
      })
    } else {
      this.setState({
        isSignUpBtnAble: false
      })
    }
  }

  // 提交反馈
  handleBtnClick = () => {
    // 发送反馈请求
    const that = this
  
    Taro.getStorage({
      key:'memberID',
      success: function (res) {
        Taro.request({
          url: 'https://www.swpuclub.cn/weChatSuggest?memberID='+`${res.data}`+'&suggest=' + 
          that.state.activitythinks + '&memberName=' + that.state.memberName +"&clubID="+`${res.data}`.split('-')[0], 
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
                  isUpdateMessage: true
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

    this.setState({
      isTipsOpened: true
    })
    setTimeout(() => {
      this.setState({
        activitythinks: '',
        isTipsOpened: false,
        isSignUpBtnAble: false
      })
    }, 2000)
  }

  render () {
    const { activitythinks, isSignUpBtnAble, isTipsOpened } = this.state

    return (
      <View className='suggest'>
        <Text className="suggestTitle">填写你的反馈内容</Text>
        <AtTextarea
          className="suggestTextarea"
          value={activitythinks}
          onChange={this.handleTipsChange}
          maxLength={200}
          height={300}
        />
        <AtButton 
          onClick={this.handleBtnClick} 
          disabled={!isSignUpBtnAble} 
          className={isSignUpBtnAble ? 'thinksBtnable' : 'thinksBtndisable'}>
          提交
        </AtButton>
        <AtToast isOpened={isTipsOpened} text="反馈已提交" duration={2000}></AtToast>
      </View>
    )
  }
}
