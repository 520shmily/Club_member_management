import Taro, { Component } from '@tarojs/taro'
import { View, Text ,Image} from '@tarojs/components'
import { AtCurtain} from 'taro-ui'
import './index.scss'

export default class ShowClubPhotos extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isImgOpened: false,
    }
  
  }

  onClose () {
    this.setState({
      isImgOpened: false
    })
  }

  handlerOnclick = () => {
    this.setState({
      isImgOpened: true
    })
  }

  render () {
    const { photo } = this.props;
    return (
      <View className="showClubPhotos">
        <AtCurtain
          isOpened={this.state.isImgOpened}
          onClose={this.onClose.bind(this)}
        >
          <Image
            src={photo}
          />
        </AtCurtain>
        <Image 
          className='at-article__img itemPhoto' 
          src={photo} 
          mode='aspectFit'
          onClick={this.handlerOnclick} />
      </View>
    )
  }
}