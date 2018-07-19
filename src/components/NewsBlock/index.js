import React, { Component } from 'react';
import '../GameBlock/style.scss';
import './style.scss';
class NewsBlock extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="game-block news-block">
                <a href="" data-flex="dir:left box:last">
                    <div className="game-msg">
                        <div className="game-name">{this.props.game.title}</div>
                     <div className="news-type">{this.props.game.type_name}·{this.props.game.last_time_lang}</div>
                    </div>
                    <div className="img-show" style={{backgroundImage:`url(${this.props.game.title_img_thumb})`}}></div>
                </a>
            </div>
        )
    }
}

export default NewsBlock;
