import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.scss';
import { HttpRequest } from '../../api'
import GameBlock from '../../components/GameBlock';
import NewsBlock from '../../components/NewsBlock';
import FootTab from '../../components/FootTab';
import 'spring-picker/lib/style.css';
import { Picker, Popup } from 'spring-picker';
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
          games: [],
          informations: [],
          banners: [],
          userPickerVisible: false,
          defaultValue: {name: 'Lincal', value: 5},
      }
      this.userData =  {
          list: [
              {name: '杜保坤', value: 0},
              {name: '况宏瑞', value: 1},
              {name: '盘维', value: 2},
              {name: '杨泉', value: 3},
              {name: '福娃', value: 4},
              {name: 'Lincal', value: 5},
              {name: '记忆残骸', value: 6},
              {name: 'Raoh', value: 7},
              {name: '铁甲飞龙', value: 8},
              {name: '吴泽兵', value: 9},
              {name: '邱福龙', value: 10},
              {name: '小泥巴', value: 11},
          ],
          defaultValue: this.state.defaultValue,
          displayValue (item) {
              return item.name;
          }
      };
  }
    // user选择
    showUserPicker (e) {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({userPickerVisible: true});
    }

    handleChangeUser (data) {
        data = data || {}
        this.userData.defaultValue = data;
        this.setState({defaultValue: data});
    }

    closeUserPicker () {
        this.setState({userPickerVisible: false});
    }

    cancelUserPicker () {
        this.userData.defaultValue = {};
        this.setState({
            userPickerVisible: false,
            defaultValue: {}
        });
    }
      componentDidMount(){
          this.getBanners();
          this.getGames();
          this.getClubInformation();
      }
      getBanners(){
          HttpRequest({
              url:'Ads',
              callback: (res) => {
                  console.log(res)
                this.setState({
                    banners: res.data,
                })
              }
          })
      }
    getClubInformation(){
        HttpRequest({
            url:'ClubInformation?page=1&row=5',
            callback: (res) => {
                this.setState({
                    informations: res.data.list,
                })
            }
        })
    }
    getGames(){
        HttpRequest({
            url:'Games',
            callback: (res) => {
                this.setState({
                    games: res.data,
                })
            }
        })
    }

    componentWillUnmount() {
        if (this.swiper) { // 销毁swiper
            this.swiper.destroy()
        }
        if (this.gameSwiper) { // 销毁swiper
            this.gameSwiper.destroy()
        }
    }
    componentDidUpdate(){
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
        if(this.gameSwiper){
            this.gameSwiper.slideTo(0, 0)
            this.gameSwiper.destroy()
            this.gameSwiper = null;
        }
        this.gameSwiper = new Swiper(this.refs.game, {
            loop:true,
            pagination: {
                el: '.swiper-paginations',
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
              <div className="swiper-pagination" id='body-left-pagination'></div>
          </div>
          <div data-flex="dir:left box:first" className="info">
              <div><img src={require("../../static/images/news_title.png")} alt="news"/></div>
              <div className="info-list">
                  <div>风神先锋赛火热报名中，欢迎各大爱好…</div>
                  <div>风神先锋赛火热报名中，欢迎各大爱好…</div>
              </div>
          </div>
          <div className="info search-box">
              <div className="search-bar"><img src={require("../../static/images/calendar.png")} alt="calendar"/>07-26 <span>（今天）</span> </div>
              <div className="search-bar" onClick={this.showUserPicker.bind(this)}><img src={require("../../static/images/vip.png")} alt="calendar"/>{ this.state.defaultValue.name }</div>
              <div className="btn-box">
                  <div className="btn search-btn">搜索球场套餐</div>
              </div>
          </div>
          <div className="pre-block" style={{'display':this.state.games.length > 0 ? 'block' : 'none'}}>
              <div className="pre-title"><img src={require("../../static/images/hot.png")} alt=""/>热门赛事 <span className="more">更多</span>  </div>
              <div className="swiper-container" ref="game">
                  <div className="swiper-wrapper">
                      <div className="swiper-slide">
                          {
                              this.state.games.map((item, index) => {
                                  if(index < 3){
                                    return <GameBlock game={item} key={index}></GameBlock>
                                  }
                              })
                          }
                      </div>
                      {
                          this.state.games.length > 3 ?
                              <div className="swiper-slide">
                                  {
                                      this.state.games.map((item, index) => {
                                          if(index > 2){
                                              return <GameBlock game={item} key={index}></GameBlock>
                                          }
                                      })
                                  }
                          </div> : ''
                      }
                  </div>
                  <div className="swiper-paginations swiper-pagination"></div>
              </div>


          </div>
          <div className="pre-block" style={{'display':this.state.informations.length > 0 ? 'block' : 'none'}}>
              <div className="pre-title"><img src={require("../../static/images/news.png")} alt=""/>风神资讯 <span className="more">更多</span>  </div>
              {
                  this.state.informations.map((item, index) => {
                      return <NewsBlock game={item} key={index}></NewsBlock>
                  })
              }
          </div>
          <FootTab addClass="home"></FootTab>
          <div>
              <Popup
                  onCancel={this.cancelUserPicker.bind(this)}
                  onConfirm={this.closeUserPicker.bind(this)}
                  visible={this.state.userPickerVisible}>
                  <Picker
                      onChange={this.handleChangeUser.bind(this)}
                      data={this.userData}
                  />
              </Popup>
          </div>
      </div>
    );
  }
}

export default App;
