import React, { Component } from "react";
import { Link } from "react-router-dom";
import { HttpRequest } from '../../api'
import HeadTab from '../../components/HeadTab';
import FootTab from '../../components/FootTab';
import './style.scss';
class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                {type: 'play', text: '球场订单'},
                {type: 'game', text: '赛事报名'},
                {type: 'catering', text: '餐饮订单'},
            ],
            indexing: 1,
            type: 'play',
            order_list: [],
        }
    }
    componentWillMount() {
        let type = this.props.match.params.type;
        this.currentType(type);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        let type = nextProps.match.params.type;
        this.currentType(type);
    }

    currentType(type) {
        let index = 1, url = 'GolfOrder';
        switch (type) {
            case 'play':
                index = 1;
                url = 'GolfOrder';
                break;
            case 'game':
                index = 2;
                url = 'GamesOrder';
                break;
            case 'catering':
                index = 3;
                url = 'RestaurantOrder';
                break;
        }
        this.setState({
            indexing: index,
            type: type,
        });
        //
        HttpRequest({
            url: url,
            callback: (res) => {
                this.setState({
                    order_list: res.data,
                })
            }
        })
    }


    render() {
        const { tabs, indexing, type, order_list } = this.state;
        return (
            <div className="order-form has-foottab">
                <HeadTab tabs={tabs} indexing={indexing} type={type}></HeadTab>
                {/*球场订单*/}
                {
                    type === 'play' ? <div className="order-block">
                        <ul>
                            {
                                order_list.map((item, index) => {
                                    return(
                                        <li key={index}>
                                            <Link to="/">
                                                <div className="add-time">{item.add_time} <span>待付款</span></div>
                                                <div className="order-detail">
                                                    <div className="detail-name">{item.full_name}</div>
                                                    {
                                                        !item.combo_info ? '' : item.combo_info.map((vo, k) => {
                                                            return (
                                                                <div className="tee-time" key={k}>TeeTime: {vo.play_date} <span>{vo.counter}人</span></div>
                                                            )
                                                        })
                                                    }
                                                    <div className="total"><b>合计：</b><span>￥{item.total_amount}</span></div>
                                                </div>
                                            </Link>
                                            <div className="btn-bar"><span>取消订单</span><span>支付</span></div>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div> : ''
                }

                {/*赛事订单*/}
                {
                    type === 'game' ? <div className="order-block">
                        <ul>
                            {
                                order_list.map((item,index) => {
                                    return (
                                        <li key={index}>
                                            <Link to="/">
                                                <div className="add-time">{item.add_time_lang} <span>{item.order_status_lang}</span></div>
                                                <div className="order-detail">
                                                    <div className="detail-name">{item.game_name}</div>
                                                    <div className="tee-time">比赛球场: {item.course_name} </div>
                                                    <div className="tee-time">比赛时间: {item.order_status_lang} </div>
                                                    <div className="tee-time">球员姓名: {item.player_name} </div>
                                                    <div className="total"><b>合计：</b><span>￥{item.regist_fee}</span></div>
                                                </div>
                                            </Link>
                                            <div className="btn-bar"><span>取消订单</span><span>支付</span></div>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div> : ''
                }

                {/*餐饮订单*/}
                {
                    type === 'catering' ? <div className="order-block">
                        <ul>
                            {
                                order_list.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Link to="/">
                                                <div className="add-time">{item.add_time} <span>{item.status_txt}</span></div>
                                                <div className="order-detail">
                                                    <div className="detail-name">{item.restaurant_name}</div>
                                                    {
                                                        !item.goods_list ? '' : item.goods_list.map((vo,k) => {
                                                            return (
                                                                <div className="tee-time" key={k}>{vo.goods_name}<b>X{vo.num}</b></div>
                                                            )
                                                        })
                                                    }

                                                    <div className="total"><b>合计：</b><span>￥1436</span></div>
                                                </div>
                                            </Link>
                                            <div className="btn-bar"><span>取消订单</span><span>支付</span></div>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div> : ''
                }

                <FootTab addClass="order"></FootTab>
            </div>
        )
    }
}


export default OrderForm;