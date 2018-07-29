import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

class HeadTab extends Component {
    constructor(props) {
        super(props);
    }

    calulateLeft() {
        let baseLeft = 100/(this.props.tabs.length * 2);
        return baseLeft;
    }

    render() {
        let lineLeft = {
            left: (this.calulateLeft() * (this.props.indexing * 2 - 1)) + '%',
        };
        return (
            <div className="tab-box">
                <div className="head-tab" data-flex="dir:left box:mean">
                    {
                        this.props.tabs.map((tab, index) => {
                            return (
                                <Link to={`/order_list/${tab.type}`} key={index} className={tab.type === this.props.type ? 'active' : '' }>
                                    <div>{tab.text}</div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="move-line" style={lineLeft}></div>
            </div>
        )
    }

}

export default HeadTab;
