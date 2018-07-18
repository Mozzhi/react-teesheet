import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.scss';
import { axios } from '../../api'
import ReactSwipe from 'react-swipe';
import GameBlock from '../../components/GameBlock';
import NewsBlock from '../../components/NewsBlock';
import FootTab from '../../components/FootTab';
let Swiper = window.Swiper;

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          tag: [],
          game: {
              img:'http://teesheet.dev.baigolf.com/static/uploads/ads_title_img/20180712/702c3cb4f0c8b5f0cfbe5c45a9843196.jpg',
              name: '赛事标题',
              play_time: '2018-08-01 10:00',
              remain_num: 20,
          },
          banners: [],
      }
  }
  componentDidMount(){
      this.getBanners();
  }
  // getNews(){
  //     axios.get('ClubInformation?page=1&row=5')
  //         .then((res) => {
  //
  //         })
  // }
  getBanners(){
      axios.get('Ads')
          .then((res) => {
              console.log(res.data.data)
            this.setState({

                banners: res.data.data,
            })
          })
  }
    componentWillUnmount() {
        if (this.swiper) { // 销毁swiper
            this.swiper.destroy()
        }
    }
    componentDidUpdate(){
      console.log('s')
        if(this.swiper){
            this.swiper.slideTo(0, 0)
            this.swiper.destroy()
            this.swiper = null;
        }
        this.swiper = new Swiper(this.refs.lun, {
            loop:true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

  render() {
    return (
      <div className="home">
          <div className="swiper-container" ref="lun">
              <div className="swiper-wrapper">
                  {
                      this.state.banners.map((banner, index) => {
                          return (<div className="swiper-slide" data-id="0" key={index}><img src={banner.title_img} alt={banner.ad_title}/></div>)
                      })
                  }
              </div>
              <div id="PgFather">
                  <div className="swiper-pagination" id='body-left-pagination'></div>
              </div>

          </div>
          <div className="pre-block">
              <div className="pre-title"><img src={require("../../static/images/hot.png")} alt=""/>热门赛事 <span className="more">更多</span>  </div>
              <GameBlock game={this.state.game}></GameBlock>
          </div>
          <div className="pre-block">
              <div className="pre-title"><img src={require("../../static/images/news.png")} alt=""/>风神资讯 <span className="more">更多</span>  </div>
              <NewsBlock game={this.state.game}></NewsBlock>
          </div>
          <FootTab addClass="home"></FootTab>
      </div>
    );
  }
}

export default App;
