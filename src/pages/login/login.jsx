import Taro, { Component } from '@tarojs/taro'
import { View, Text, OpenData} from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import './login.scss'

export default class Login extends Component {

  config = {
    navigationBarTitleText: '会员之家'
  }

  state = {
    errorMessgae: '',
    password: '',
    username: '',
    isBothShow: false,
  }

  onSubmit = (e) => {
    const { username, password } = this.state
    const that = this;

    if (username === ''){
      this.setState({
        isBothShow: true,
        errorMessgae: '会员编码不能为空！'
      })
    } else if (password === ''){
      this.setState({
        isBothShow: true,
        errorMessgae: '密码不能为空！'
      })
    } else {
      Taro.request({
        url: 'https://www.swpuclub.cn/weChatlogin?username='+`"${username}"`+'&password='+password, 
        data: {
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if(res.statusCode === 200) {
            const requestData = res.data;
            if (requestData.code === 0) {
              that.setState({
                isBothShow: true,
                errorMessgae: '会员编码或密码错误！'
              })
              return;
            }
            that.setState({
              errorMessgae: ''
            })
            Taro.reLaunch({
              url: '/pages/activity/activity?clubID=' + requestData.data[0].clubID
            })
            Taro.setStorage({
              key:"memberID",
              data:username
            })
            Taro.setStorage({
              key:"memberPW",
              data:password
            })
            Taro.setStorage({
              key:"memberName",
              data: requestData.data[0].memberName
            })
            Taro.setStorage({
              key:"isSignOff",
              data: false
            })
              
          } else {
            console.log(res.errMsg)
          }
        }
      })
    }
  }

  handleFocus = () => {
    this.setState({
      isBothShow: false,
      errorMessgae: ''
    })
  }

  handleNameChange = (e) => {
    this.setState({
      username: e,
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e,
    })
  }

  render () {
    const { errorMessgae, username, password, isBothShow } = this.state
    return (
      <View className='login'>
        <OpenData className='Avatar' type='userAvatarUrl'></OpenData>   
        <OpenData className='name' type='userNickName' lang='zh_CN'></OpenData>   
        <AtForm
          onSubmit={this.onSubmit}
        >
          <AtInput
            name='username'
            title='会员编码'
            type='text'
            placeholder='输入会员编码'
            value={username}
            onChange={this.handleNameChange}
            onFocus={this.handleFocus}
          />
          <AtInput
            name='password'
            title='密码'
            type='password'
            placeholder='输入密码'
            value={password}
            onChange={this.handlePasswordChange}
            onFocus={this.handleFocus}
          />
          <Text className={isBothShow ? 'isShow' : ''}>{errorMessgae}</Text>
          <Text className="tips">提示：用户默认密码为学生学号，登录后请及时修改密码</Text>
          <AtButton className='btn' formType='submit'>登录</AtButton>
        </AtForm>
      </View>
    )
  }
}
