import React, { Component } from "react";
import './style.scss';
import HeadNavigation from "../../components/HeadNavigation";

class CourseList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="course-list">
                <HeadNavigation title={'04月06日'} history={this.props.history}></HeadNavigation>
                <div>
                    <div className="course-block">
                        <div className="course-name">哈沃斯球场</div>
                        <div className="combo-block">
                            <div>2018年会员专享</div>
                            <div data-flex="dir:left box:last">
                                <div>06:00~18:00</div>
                                <div>￥123</div>
                            </div>
                            <div data-flex="dir:left box:last">
                                <div><img src={require('../../static/images/caddie.png')} alt=""/></div>
                                <div><span className="book">预订</span></div>
                            </div>
                            <div data-flex="dir:left box:last">
                                <div>企业团体会籍卡</div>
                                <div>￥123</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default CourseList;