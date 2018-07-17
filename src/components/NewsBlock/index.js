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
                        <div className="game-name">{this.props.game.name}</div>
                     <div className="news-type">会谈·35分钟前</div>
                    </div>
                    <div className="img-show" style={{backgroundImage:`url(${this.props.game.img})`}}></div>
                </a>
            </div>
        )
    }
}

export default NewsBlock;
