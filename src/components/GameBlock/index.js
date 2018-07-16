import React, { Component } from 'react';
import './style.scss';

class GameBlock extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return (
            <div className="game-block">
                <a href="" data-flex="dir:left box:first">
                    <div className="img-show" style={{backgroundImage:`url(${this.props.game.img})`}}></div>
                    <div className="game-msg">
                        <div>{this.props.game.name}</div>
                        <div>开球时间：{this.props.game.play_time}</div>
                        <div data-flex="dir:left box:last">
                            <div><span></span></div>
                            <div>仅剩{this.props.game.remain_num}位</div>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default GameBlock;
