import React, { Component } from 'react';
import './style.scss';
import HeadNavigation from "../../components/HeadNavigation";

class BallPosition extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="ball-position">
                <HeadNavigation title={'普通套餐'}></HeadNavigation>
                <div className="table-head" data-flex="dir:left box:first">
                    <div className="time-head">
                        <span className="t-span">时间</span>
                        <span className="b-span">球位</span>
                    </div>
                    <div data-flex="dir:left box:mean" className="ball-head">
                        {
                            [1,2,3,4].map((item, index) => {
                                return (
                                    <div key={index} data-flex="main:center cross:center"><span>{item}</span></div>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="table-body" data-flex="dir:left box:first">
                    <div className="time-box">
                        <div>00:00</div>
                    </div>
                    <div>
                        <div data-flex="dir:left box:mean">
                            <label htmlFor="c1">
                                <input type="checkbox" id="c1"/>
                                <span></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BallPosition;