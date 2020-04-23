import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView, SwiperItem, Swiper, Image } from '@tarojs/components'
import './club.scss'
import img from '../club/timg.jpeg'
import { IsSignOff } from '../../components/isSignOff/index'
import { ShowClubPhotos } from '../../components/clubPhotos/index'

export default class Club extends Component {
  state = {
    ClubMessgae: [],
    clubPhotos: [],
  }

  componentWillMount () { 
  }

  componentDidMount () { 
    const that = this
    Taro.getStorage({
      key:'clubID',
      success: function (res) {
        // 社团信息
        Taro.request({
          url: 'https://www.swpuclub.cn/weChatGetclubMessage?clubID='+`"${res.data}"`, 
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
                  ClubMessgae: requestData.data[0]
                })
                return;
              } 
            } else {
              console.log(res.errMsg)
            }
          }
        })

        // 社团风采墙
        Taro.request({
          url: 'https://www.swpuclub.cn/weChatGetImages?clubID='+`"${res.data}"`, 
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
                  clubPhotos: requestData.data
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

    Taro.getStorage({
      key:'isSignOff',
      success: function (res) {
        that.setState({
          isSignOff: res.data
        })
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
    navigationBarTitleText: '会员之家-社团'
  }

  render() {
    const scrollTop = 0
    const { ClubMessgae, clubPhotos, isSignOff } = this.state;

    let clubPhotosList = clubPhotos.map((item) => {
      return <ShowClubPhotos 
              photo={item.imageId}
              >
            </ShowClubPhotos>
    })

    return (
      <ScrollView
        className="scrollview"
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
      >
      <View id={isSignOff ? 'show' : ''}>
        <View className="clubIntroduction">
          <View className="itemContent">
            <View className="image"></View>
            <Text className='toknew'>社团知多少？</Text>
          </View>
        </View>
        <View className='at-article'>
          <View className='at-article__h1'>
            {ClubMessgae.clubID} —— {ClubMessgae.clubName}
          </View>
          <View className='at-article__info'>
          </View>
          <View className='at-article__content'>
            <View className='at-article__section'>
              <Image 
                className='at-article__img' 
                src={ClubMessgae.clubImgMessage}
                mode='widthFix' />
              <View className='at-article__h3'>
                 {ClubMessgae.clubWordMessage}
              </View>
              <Image 
                className='at-article__img' 
                src={ClubMessgae.clubPhotos} 
                mode='widthFix' />
              {/* <View className='at-article__h3'>
                {ClubMessgae.clubWordMessage}
              </View> */}
            </View>
          </View>
        </View>
        <View className='clubPhotos'>
          <Text className='itemTitle'>社团风采墙</Text>
          <View className='showPhoto'>
            {clubPhotosList}
          </View>
        </View>
      </View>
      <View className="isSignOff" id={isSignOff ? '' : 'show'}>
        <IsSignOff></IsSignOff>
      </View>
      </ScrollView>
    )
  }
}
