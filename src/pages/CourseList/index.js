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
        HttpRequest({
            url:'GolfCombo?booking_type=1&date=2018-08-01',
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
                                    <div className="combo-block">
                                        <div className="combo-name">2018年会员专享</div>
                                        <div data-flex="dir:left box:last" className="pre-bar">
                                            <div>06:00~18:00</div>
                                            <div className="price-box">￥<b>123</b></div>
                                        </div>
                                        <div data-flex="dir:left box:last" className="pre-bar">
                                            <div><img src={require('../../static/images/caddie.png')} alt=""/></div>
                                            <div className="price-box"><span className="book">预订</span></div>
                                        </div>
                                        <div data-flex="dir:left box:last" className="pre-bar card-bar">
                                            <div>企业团体会籍卡</div>
                                            <div className="price-box">￥<b>123</b></div>
                                        </div>
                                        <div data-flex="dir:left box:last" className="pre-bar card-bar has-no-card">
                                            <div>企业团体会籍卡</div>
                                            <div className="price-box">￥<b>123</b></div>
                                        </div>
                                    </div>
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