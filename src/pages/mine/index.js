import React, { Component } from 'react';
import { HttpRequest } from '../../api'
import FootTab from '../../components/FootTab';
import './style.scss';
class Mine extends Component {
    constructor(props){
        super(props);
        this.state = {
            myMsg: {},
        }
    }
    getMyMsg(){
        HttpRequest({
            url:'Users',
            callback: (res) => {
                console.log(res)
                this.setState({
                    myMsg: res.data,
                })
            }
        })
    }
    componentDidMount(){
        this.getMyMsg();
    }

    render() {
        const { myMsg } = this.state;
        let backgroundPic = {
            backgroundImage: `url(${myMsg.user_pic})`,
        }
        return (
            <div className="mine">
                <div className="my-detail">
                    <div data-flex="dir:left box:justify" className="my-info">
                        <div className="my-pic" data-flex=" main:left cross:center">
                            <div style={{
                                backgroundImage: `url(${myMsg.user_pic})`,
                            }}></div>
                        </div>
                        <div>
                            <div>Matt Damon <span>个人终身卡</span></div>
                            <div>会籍有效期:2018-03-31</div>
                            <div>会籍号:888543455</div>
                        </div>
                        <div></div>
                    </div>
                    <div data-flex="box:mean" className="assets">
                        <div>
                            <b>4568</b>
                            <div>余额</div>
                        </div>
                        <div>
                            <b>4500</b>
                            <div>积分</div>
                        </div>
                        <div>
                            <b>12</b>
                            <div>优惠券</div>
                        </div>
                    </div>
                </div>
                <FootTab addClass="me"></FootTab>
            </div>
        )
    }

}

export default Mine;
