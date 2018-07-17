import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.scss';
import { axios } from '../../api'
import ReactSwipe from 'react-swipe';
import GameBlock from '../../components/GameBlock';
import NewsBlock from '../../components/NewsBlock';
import FootTab from '../../components/FootTab';

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
          }
      }
  }
  componentDidMount(){
      axios.get('Ads')
    .then((res) => {
      console.log(res)
    })
  }
  getNews(){
      axios.get('ClubInformation?page=1&row=5')
          .then((res) => {
              
          })
  }


  render() {
    return (
      <div className="home">
        <ReactSwipe className="carousel" swipeOptions={{continuous: true}}>
            <div><img src={this.state.game.img} /></div>
        </ReactSwipe>
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
