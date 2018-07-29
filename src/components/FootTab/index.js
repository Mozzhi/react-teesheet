import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
class FootTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab_type: 'home',
        }
        this.doneTab = this.doneTab.bind(this);
    }

    doneTab(type){
        this.setState({
            tab_type: type,
        })
    }

    render() {
        return (
            <div className="foot-tab" data-flex="dir:left box:mean">
                <div data-flex="main:center cross:center" className={(this.props.addClass === 'home' ? 'active' : '')}>
                    <Link to="/">
                        <div>
                            <span className={"tab-icon home-icon "}></span>
                            <div>首页</div>
                        </div>
                    </Link>
                </div>
                <div data-flex="main:center cross:center" className={(this.props.addClass === 'order' ? 'active' : '')}>
                    <Link to="/order_list/play">
                    <div>
                        <span className={"tab-icon order-icon "}></span>
                        <div>订单</div>
                    </div>
                    </Link>
                </div>
                <div data-flex="main:center cross:center" className={(this.props.addClass === 'gps' ? 'active' : '')}>
                    <Link to="/mine">
                    <div>
                        <span className={"tab-icon gps-icon "}></span>
                        <div>导航</div>
                    </div>
                    </Link>
                </div>
                <div data-flex="main:center cross:center" className={(this.props.addClass === 'me' ? 'active' : '')}>
                    <Link to="/mine">
                    <div>
                        <span className={"tab-icon me-icon "}></span>
                        <div>我的</div>
                    </div>
                    </Link>
                </div>
            </div>
        )
    }
}

export default FootTab;