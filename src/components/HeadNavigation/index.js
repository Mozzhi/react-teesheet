import React, { Component } from 'react';
import './style.scss';

class HeadNavigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="head-navigator" data-flex="dir:left box:justify">
                <div className="nav-side" data-flex="mian:left cross:center" onClick={() => {this.props.history.goBack()}}><img src={require('../../static/images/btn_back.png')} alt=""/></div>
                <div>{this.props.title}</div>
                <div className="nav-side side-right"></div>
            </div>
        )
    }
}

export default HeadNavigation;