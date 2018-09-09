import React, { Component } from "react";
import './style.scss';
import { HttpRequest } from '../../api';
import HeadNavigation from "../../components/HeadNavigation";
import { Calendar } from 'antd-mobile';
import {returnMD} from "../../common/util";


const now = new Date();
class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course_list: [],
            user_info: {},
            params: {},
            show: false,
            startTime: now,
        }
    }
    calendarShow() {
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
        this.setState({
            show: true,
            config: { type: 'one' },
        });
    }
    onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            show: false,
            startTime: now,
            endTime: undefined,
        });
    }

    onConfirm = (startTime, endTime) => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
            show: false,
            startTime: startTime,
            endTime,
        });
        console.log(startTime)
        this.props.history.push(`/course_list/${returnMD(startTime, 'ymd')}/${this.state.params.type}`);
        this.getCourseList(returnMD(startTime, 'ymd'))
    }
    componentDidMount() {
        this.getCourseList();
    }
    getCourseList(date){
        let params = this.props.match.params;
        if(date){
            params.date = date;
        }
        this.setState({
            params: params,
            startTime: params.date
        });
        HttpRequest({
            url:`GolfCombo?booking_type=${params.type}&date=${params.date}`,
            callback: (res) => {
                this.setState({
                    course_list: res.data.combo_list,
                    user_info: res.data.user_info
                })
            },
            fail: (res) => {
                this.setState({
                    course_list: [],
                    user_info: res.data.user_info
                })
            }
        })
    }

    render() {
            const { course_list, user_info, params } = this.state;
            let dateImg = `<img src="${require('../../static/images/calendar.png')}" alt="" />`;
            const chooseDate = new Date(params.date);
        return (
            <div className="course-list">
                <HeadNavigation title={params.date} history={this.props.history} slots={dateImg} rightEvent={this.calendarShow.bind(this)}></HeadNavigation>
                <div>
                    {
                        course_list.map((item, index) => {
                            return (
                                <div className="course-block" key={index}>
                                    <div className="course-name">{item.course_name}</div>
                                    {
                                        item.combo_list.map((vo, i) => {
                                            return (
                                                <div className="combo-block" key={i}>
                                                    <div className="combo-name">{vo.combo_name}</div>
                                                    <div data-flex="dir:left box:last" className="pre-bar">
                                                        <div>{vo.time_interval}</div>
                                                        <div className="price-box">￥<b>{vo.show_price}</b></div>
                                                    </div>
                                                    <div data-flex="dir:left box:last" className="pre-bar icon-bar">
                                                        <div>
                                                            {
                                                                vo.icon_arr.map((icon, k) => {
                                                                    return (
                                                                        <img src={require(`../../static/images/${icon}.png`)} alt={icon} key={k}/>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <div className="price-box"><span onClick={() => { this.props.history.push(`/ball_position/${item.course_id}/${this.props.match.params.date}/${vo.price_id}`) }} className="book">预订</span></div>
                                                    </div>
                                                    {
                                                        vo.price_list.map((card, k) => {
                                                            return (
                                                                <div data-flex="dir:left box:last" className={`pre-bar card-bar ${card.is_valid ? '' : 'has-no-card'}`} key={k}>
                                                                    <div>{card.member_name}</div>
                                                                    <div className="price-box">￥<b>{card.member_price}</b></div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            )
                        })
                    }

                </div>

                <Calendar
                    {...this.state.config}
                    visible={this.state.show}
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}
                    defaultDate={chooseDate}
                    minDate={new Date(+now - 5184000000)}
                    maxDate={new Date(+now + 31536000000)}
                />
            </div>
        )
    }
}

export default CourseList;