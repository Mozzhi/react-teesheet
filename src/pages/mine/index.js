import React, { Component } from 'react';
import { HttpRequest } from '../../api'
import FootTab from '../../components/FootTab';
import './style.scss';
import {returnMD} from "../../common/util";
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
            <div className="mine has-foottab">
                <div className="attention" data-flex="dir:left box:justify"><div><img className="notices" src={require('../../static/images/icon_notice_me.png')} alt="icon_notice_me"/></div><div>首次完善个人资料奖励<b>5000</b>积分(可抵扣<b>50</b>元)</div><div><img src={require('../../static/images/btn_close_me.png')} alt="btn_close_me"/></div></div>
                <div className="my-detail">
                    <div data-flex="dir:left box:justify" className="my-info">
                        <div className="my-pic" data-flex=" main:left cross:center">
                            <div style={{backgroundImage: `url(${myMsg.user_pic})`,}}></div>
                        </div>
                        <div className="user-base-msg">
                            <div className="user-name">{myMsg.player_name}<span>{myMsg.member_type_id_lang}</span></div>
                            <div>会籍有效期:{myMsg.card_valid_date_lang}</div>
                            <div>会籍号:{myMsg.card_num_lang}</div>
                        </div>
                        <div data-flex="dir:right cross:center">
                            <div><span className="more do-finish">去完善<em className="red-dot"></em></span></div>
                        </div>
                    </div>
                    <div data-flex="box:mean" className="assets">
                        <div>
                            <b>{myMsg.balance - 0}</b>
                            <div>余额</div>
                        </div>
                        <div>
                            <b>{myMsg.point}</b>
                            <div>积分</div>
                        </div>
                        <div>
                            <b>{myMsg.coupon_num}</b>
                            <div>优惠券</div>
                        </div>
                    </div>
                </div>
                <div className="operation-bar">
                    <div onClick={() => { this.props.history.push(`/myqr`)}}>我的二维码<span className="more"><img src={require('../../static/images/icon_QR_me.png')} alt="qr"/></span></div>
                </div>
                <div className="operation-bar">
                    <div>关于风神<span className="more"></span></div>
                    <div>联系我们<span className="more"></span></div>
                </div>
                <FootTab addClass="me"></FootTab>
            </div>
        )
    }

}

export default Mine;
