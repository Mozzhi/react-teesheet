import React, { Component } from 'react';
import './style.scss';

class GameBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { game } = this.props;
        return (
            <div className="game-block">
                <a href="" data-flex="dir:left box:first">
                    <div className="img-show" style={{backgroundImage:`url(${game.title_img})`}}><span className={(game.tip_status == 2 && game.tip_status > 1) ? 'under-way' : 'finished'}>{game.tip_status_lang}</span></div>
                    <div className="game-msg">
                        <div className="game-name">{game.game_name}</div>
                        <div>开球时间：{game.game_time_start_lang}</div>
                        <div className="remain-box" data-flex="dir:left box:last">
                            <div><span className="remain-bar"><b style={{'width':game.registed_num_len * 100 + '%'}}></b></span></div>
                            <div>仅剩{game.remain_num}位</div>
                        </div>
                    </div>
                </a>
            </div>
        )
    }
}

export default GameBlock;
