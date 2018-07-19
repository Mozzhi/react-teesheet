import React, { Component } from 'react';
import './style.scss';

class GameBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="game-block">
                <a href="" data-flex="dir:left box:first">
                    <div className="img-show" style={{backgroundImage:`url(${this.props.game.title_img})`}}></div>
                    <div className="game-msg">
                        <div className="game-name">{this.props.game.game_name}</div>
                        <div>开球时间：{this.props.game.game_time_start_lang}</div>
                        <div className="remain-box" data-flex="dir:left box:last">
                            <div><span className="remain-bar"><b style={{'width':this.props.game.registed_num_len * 100 + '%'}}></b></span></div>
                            <div>仅剩{this.props.game.remain_num}位</div>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default GameBlock;
