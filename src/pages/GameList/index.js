import React, { Component } from 'react';
import { HttpRequest } from '../../api';
import GameBlock from '../../components/GameBlock';
import HeadNavigation from '../../components/HeadNavigation';

class GameList extends Component {
    constructor(props){
        super(props);
        this.state = {
            gameList: [],
        }
    }

    componentDidMount(){
        this.getGamesList();
    }

    getGamesList() {
        HttpRequest({
            url: `Games`,
            callback: (res) => {
                this.setState({
                    gameList: res.data,
                })
            }
        })
    }

    render (){
        const { gameList } = this.state;
        return (
            <div>
                <HeadNavigation title={'风神赛事列表'} history={this.props.history}></HeadNavigation>
                <div style={{background:'#fff', paddingLeft: 20/37.5 + 'rem'}}>
                    {
                        gameList.map((item, index) => {
                            return (
                                <GameBlock game={item} key={index}></GameBlock>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}

export default GameList;