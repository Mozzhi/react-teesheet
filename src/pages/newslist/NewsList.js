import React, { Component } from 'react';
import NewsBlock from '../../components/NewsBlock';
import HeadNavigation from '../../components/HeadNavigation';
import { HttpRequest } from '../../api';

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newslist: [],
    }
  }

  componentDidMount(){
    this.getNewsList();
  }

  getNewsList() {
    HttpRequest({
        url: `ClubInformation`,
        callback: (res) => {
          this.setState({
              newslist: res.data.list,
          })
        }
    })
  }

  render() {
    const { newslist } = this.state;
    return (
      <div>
          <HeadNavigation title={'风神资讯列表'} history={this.props.history}></HeadNavigation>
          <div style={{background:'#fff', paddingLeft: 20/37.5 + 'rem'}}>
              {
                  newslist.map((item, index) => {
                      return (
                          <NewsBlock game={item} key={index}></NewsBlock>
                      )
                  })
              }
          </div>
      </div>
    )
  }
}

export default NewsList;
