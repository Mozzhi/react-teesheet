import React, { Component } from 'react';
import { Link, history } from 'react-router-dom';
import './App.scss';
import { HttpRequest } from '../../api'
import GameBlock from '../../components/GameBlock';
import NewsBlock from '../../components/NewsBlock';
import FootTab from '../../components/FootTab';
import Picker from '../../components/Picker';
import { createArr } from "../../common/util";
import { Button } from 'antd-mobile';

let Swiper = window.Swiper;

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          tag: [],
          games: [],
          informations: [],
          banners: [],
          data: [
              {show_txt: '会员和访客', value: 1},
              {show_txt: '会员', value: 2},
              {show_txt: '访客', value: 3},
          ],
          picker_data: {
              show_txt: '会员和访客', value: 1
          },
          pickerShow: false,
          courseBusiness: [],
      }

  }

      componentDidMount(){
          this.getBanners();
          this.getGames();
          this.getClubInformation();
          this.getCourseBusiness();
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
    getCourseBusiness() {
      HttpRequest({
          url:'CourseBusiness',
          callback: (res) => {
              this.setState({
                  courseBusiness: res.data,
              })
          }
      })
    }
    handlePicker(picker, bool) {
      console.log(picker);
      this.setState({
          picker_data: picker,
          pickerShow: bool
      })
    }
    setPickerS(bool){
      this.setState({
          pickerShow: bool,
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
      let businessL = createArr(Math.ceil(this.state.courseBusiness.length / 2));
    return (
      <div className="home has-foottab">
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
          <Button>default</Button>
          <div data-flex="dir:left box:first" className="info">
              <div><img src={require("../../static/images/news_title.png")} alt="news"/></div>
              <div className="info-list">
                  <div>风神先锋赛火热报名中，欢迎各大爱好…</div>
                  <div>风神先锋赛火热报名中，欢迎各大爱好…</div>
              </div>
          </div>
          <div className="info search-box">
              <div className="search-bar"><img src={require("../../static/images/calendar.png")} alt="calendar"/>07-26 <span>（今天）</span> </div>
              <div className="search-bar" onClick={ () => {this.setPickerS(true)}}><img src={require("../../static/images/vip.png")} alt="calendar"/>{this.state.picker_data.show_txt}</div>
              <div className="btn-box">
                  <div className="btn search-btn" onClick={() => { this.props.history.push("/course_list") }}>搜索球场套餐</div>
              </div>
          </div>
          <div className="pre-block main-entry">
              {
                  businessL.map((i) => {
                    return (
                        <div data-flex="dir:left box:mean" key={i}>
                            {
                                this.state.courseBusiness.map((item, index) => {
                                    if((2*i - 2) === index){
                                    return (
                                    <a href={item.link_url === '' ? '' : item.link_url} data-flex="dir:left box:last" key={index}>
                                        <div>
                                            <div className="entry-name">{item.b_name}</div>
                                            <div>{item.b_introduction}</div>
                                        </div>
                                        <div><img src={item.b_icon} alt=""/></div>
                                    </a>
                                    )
                                    }
                                    if((2*i - 1) === index){
                                    return (
                                    <a href={item.link_url === '' ? '' : item.link_url} data-flex="dir:left box:last" key={index}>
                                        <div>
                                            <div className="entry-name">{item.b_name}</div>
                                            <div>{item.b_introduction}</div>
                                        </div>
                                        <div><img src={item.b_icon} alt=""/></div>
                                    </a>
                                    )
                                    }
                                })
                            }
                        </div>
                    )
                  })
              }

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
          <Picker refs={'comstor'} data={this.state.data} handlePicker={this.handlePicker.bind(this)} show={this.state.pickerShow}></Picker>
      </div>
    );
  }
}

export default App;
