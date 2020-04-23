import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './updateMessage.scss'
import { AtInput, AtButton, AtToast } from 'taro-ui'

export default class Updatemessage extends Component {
    state = {
      changeMessage: '',
      param: '',
      isBtnAble: false,
      nowValue: '',
      isUpdateMessage: false
    }

  componentWillMount () { }

  componentDidMount () { 
    const params = this.$router.params;
    let dateTitle = []
    let dateContent = []
    for (var i in params) {
      dateTitle.push(i)
      dateContent.push(params[i])
    }
    let param = `&${dateTitle[0]}=`

    this.setState({
      changeMessage: dateContent[0] == 'null' ? '' : dateContent[0],
      nowValue: dateContent[0] == 'null' ? '' : dateContent[0],
      param: param
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '修改信息'
  }

  handleChangeMessageChange (value) {
    this.setState({
      changeMessage: value
    })
    if (value && (value !== this.state.nowValue)) {
      this.setState({
        isBtnAble: true,
      })
    } else {
      this.setState({
        isBtnAble: false
      })
    }
  }

  handleMesssageUpClick = () => {
    // 发送请求
    const that = this
    Taro.getStorage({
      key:'memberID',
      success: function (res) {
        Taro.request({
          url: 'https://www.swpuclub.cn/weChatlogin?username='+`"${res.data}"` + that.state.param + that.state.changeMessage, 
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
    setTimeout(() =>{
      this.setState({
        isUpdateMessage: false
      })
      Taro.navigateTo({
        url: '/pages/message/message'
      })
    },2000)
  }

  render () {
    const { changeMessage, isBtnAble, isUpdateMessage } = this.state

    return (
      <View className='updateMessage'>
        <AtToast 
          isOpened={isUpdateMessage} 
          text="修改成功" duration={2000}></AtToast>
        <AtInput
          className="changeMessage"
          name='value'
          type='text'
          autoFocus={true}
          selectionStart={changeMessage.length}
          placeholder={changeMessage}
          value={changeMessage}
          onChange={this.handleChangeMessageChange.bind(this)}
        />
        <AtButton 
          size='small' 
          id="thinksBtn" 
          disabled={!isBtnAble} 
          className={isBtnAble ? 'thinksBtnable' : 'thinksBtndisable'} 
          onClick={this.handleMesssageUpClick} >
          保存
        </AtButton>
      </View>
    )
  }
}
