import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './evaluate.scss'
import fail from '../../static/images/fail.jpg'
import pass from '../../static/images/pass.jpg'
import fine from '../../static/images/fine.jpg'
import excellent from '../../static/images/excellent.jpg'

export default class Evaluate extends Component {
  
  state = {
    isShowFail: false,
    isShowPass: false,
    isShowFine: false,
    isShowExcellent: false,
    isShowNone: false
  }

  componentWillMount () { }

  componentDidMount () {
    // 发送请求获取考评成绩，根据考评成绩修改state状态
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
                if(requestData.data[0].level == '不及格') {
                  that.setState({
                    isShowFail: true,
                    isShowPass: false,
                    isShowFine: false,
                    isShowExcellent: false,
                    isShowNone: true
                  })
                } else if (requestData.data[0].level == '及格') {
                  that.setState({
                    isShowFail: false,
                    isShowPass: true,
                    isShowFine: false,
                    isShowExcellent: false,
                    isShowNone: true
                  })
                } else if (requestData.data[0].level == '良好') {
                  that.setState({
                    isShowFail: false,
                    isShowPass: false,
                    isShowFine: true,
                    isShowExcellent: false,
                    isShowNone: true
                  })
                } else if (requestData.data[0].level == '优秀') {
                  that.setState({
                    isShowFail: false,
                    isShowPass: false,
                    isShowFine: false,
                    isShowExcellent: true,
                    isShowNone: true
                  })
                } else {
                  that.setState({
                    isShowFail: false,
                    isShowPass: false,
                    isShowFine: false,
                    isShowExcellent: false,
                    isShowNone: false
                  })
                }
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
    navigationBarTitleText: '我的考评'
  }

  render () {
    const { isShowFail, isShowPass, isShowFine, isShowExcellent, isShowNone } = this.state

    return (
      <View className='evaluate'>
        <View className={isShowFail ? 'evaluateItem' : 'isShowEvaluate'}>
          <Image src={fail} mode='aspectFit' className="evaluatePhoto"></Image>
          <Text className="evaluateTitle">不及格</Text>
          <Text className="evaluateTips">有点小遗憾～下次继续努力吧</Text>
        </View>
        <View className={isShowPass ? 'evaluateItem' : 'isShowEvaluate'}>
          <Image src={pass} mode='aspectFit' className="evaluatePhoto"></Image>
          <Text className="evaluateTitle pass">及格</Text>
          <Text className="evaluateTips">考核及格啦，继续努力吧～</Text>
        </View>
        <View className={isShowFine ? 'evaluateItem' : 'isShowEvaluate'}>
          <Image src={fine} mode='aspectFit' className="evaluatePhoto"></Image>
          <Text className="evaluateTitle fine">良好</Text>
          <Text className="evaluateTips">已经很棒啦，继续挑战自己吧！</Text>
        </View>
        <View className={isShowExcellent ? 'evaluateItem' : 'isShowEvaluate'}>
          <Image src={excellent} mode='aspectFit' className="evaluatePhoto"></Image>
          <Text className="evaluateTitle excellent">优秀</Text>
          <Text className="evaluateTips">你真棒！不要骄傲继续保持哦~</Text>
        </View>
        <View className={isShowNone ? 'isShowEvaluate' : 'noneMessage'}>=== 暂时还没有考核结果哦 ===</View>
      </View>
    )
  }
}
