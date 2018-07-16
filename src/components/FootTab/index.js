import React, { Component } from 'react';
import './style.scss';
class FootTab extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="foot-tab" data-flex="dir:left box:mean">
                <div data-flex="main:center cross:center">
                    <div>
                        <span className={"tab-icon home-icon " + (this.props.addClass == 'home' ? 'active' : '')}></span>
                        <div>首页</div>
                    </div>
                </div>
                <div data-flex="main:center cross:center">
                    <div>
                        <span className={"tab-icon order-icon "+ (this.props.addClass == 'order' ? 'active' : '')}></span>
                        <div>订单</div>
                    </div>
                </div>
                <div data-flex="main:center cross:center">
                    <div>
                        <span className={"tab-icon gps-icon "+ (this.props.addClass == 'gps' ? 'active' : '')}></span>
                        <div>导航</div>
                    </div>
                </div>
                <div data-flex="main:center cross:center">
                    <div>
                        <span className={"tab-icon me-icon "+ (this.props.addClass == 'me' ? 'active' : '')}></span>
                        <div>我的</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FootTab;