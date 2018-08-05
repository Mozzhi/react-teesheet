import React, { Component } from 'react';
import './style.scss';
import { HttpRequest } from '../../api';
import HeadNavigation from "../../components/HeadNavigation";
import { createArr } from "../../common/util";

class BallPosition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time_frame: [],
            config: {},
        }
    }
    componentDidMount(){
        this.getTimeFrames();
    }
    getTimeFrames(){
        HttpRequest({
            url:'GolfTimeFrames?course_id=1&play_date=2018-08-07&price_id=529',
            callback: (res) => {
                this.setState({
                    time_frame: res.data.time_frame,
                    config: res.data.config,
                })
            }
        })
    }


    render() {
        const { time_frame, config } = this.state;
        let seatNum = createArr(config.seat_num);
        return (
            <div className="ball-position">
                <HeadNavigation title={'普通套餐'} history={this.props.history}></HeadNavigation>
                <div className="table-head" data-flex="dir:left box:first">
                    <div className="time-head">
                        <span className="t-span">时间</span>
                        <span className="b-span">球位</span>
                    </div>
                    <div data-flex="dir:left box:mean" className="ball-head">
                        {
                            seatNum.map((item, index) => {
                                return (
                                    <div key={index} data-flex="main:center cross:center"><span>{item}</span></div>
                                )
                            })
                        }

                    </div>
                </div>
                <div data-flex="dir:left box:mean" className="icon-example">
                    <div><img src={require('../../static/images/golf_grey_s.png')} alt="golf_grey_s"/>未选</div>
                    <div><img src={require('../../static/images/golf_red_s.png')} alt="golf_red_s"/>已订</div>
                    <div><img src={require('../../static/images/golf_green_s.png')} alt="golf_green_s"/>已选</div>
                </div>
                <div className="table-body" data-flex="dir:left box:first">
                    <div className="time-box">
                        {
                            time_frame.map((time,index) => {
                                return (
                                    <div key={index}>{time.tee_time_str}</div>
                                )
                            })
                        }

                    </div>
                    <div>
                        {
                            time_frame.map((time, k) => {
                                return (
                                    <div data-flex="dir:left box:mean" className="ball-box" key={k}>
                                        {
                                            seatNum.map((item, index) => {
                                                return (
                                                    <label htmlFor={`${time.tee_time}${item}`} key={index}>
                                                        <input type="checkbox" id={`${time.tee_time}${item}`}/>
                                                        <span></span>
                                                    </label>
                                                )
                                            })
                                        }

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default BallPosition;