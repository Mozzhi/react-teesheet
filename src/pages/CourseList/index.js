import React, { Component } from "react";
import './style.scss';
import { HttpRequest } from '../../api';
import HeadNavigation from "../../components/HeadNavigation";

class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course_list: [],
            user_info: {},
        }
    }

    componentDidMount() {
        this.getCourseList();
    }
    getCourseList(){
        let params = this.props.match.params;
        HttpRequest({
            url:`GolfCombo?booking_type=${params.type}&date=${params.date}`,
            callback: (res) => {
                this.setState({
                    course_list: res.data.combo_list,
                    user_info: res.data.user_info
                })
            }
        })
    }

    render() {
            const { course_list, user_info } = this.state;
        return (
            <div className="course-list">
                <HeadNavigation title={'04月06日'} history={this.props.history}></HeadNavigation>
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

            </div>
        )
    }
}

export default CourseList;