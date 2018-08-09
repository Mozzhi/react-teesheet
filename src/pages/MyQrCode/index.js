import React, { Component } from 'react';
import './style.scss';
import {HttpRequest} from "../../api";
import QrCodeWithLogo from 'qr-code-with-logo'

class MyQrCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myMsg: {}
        }
    }

    componentDidMount(){
        this.getUserInfo();
    }

    getUserInfo() {
        HttpRequest({
            url:'Users',
            callback: (res) => {
                console.log(res);
                this.setState({
                    myMsg: res.data,
                })
                const myCanvas = document.createElement('canvas');
                document.getElementById('qr_show').appendChild(myCanvas);
                let width = document.documentElement.clientWidth * 300/375;

                QrCodeWithLogo.toCanvas({
                    canvas: myCanvas,
                    content: res.data.tel,
                    width: width,
                    logo: {
                        src: res.data.user_pic,
                        radius: 8,
                    }
                })
            }
        })
    }
    render() {
        const { myMsg } = this.state;
        return (
            <div className="qr-code">
                <div id="qr">
                    <div data-flex="dir:left box:first" className="my-msg">
                        <div data-flex="main:center cross:center" className="my-pic">
                            <div style={{backgroundImage: `url(${myMsg.user_pic})`,}}></div>
                        </div>
                        <div className="base">
                            <div className="user-name">{myMsg.player_name}</div>
                            <div>会籍号:{myMsg.card_num_lang}</div>
                        </div>
                    </div>
                    <div id="qr_show"></div>
                    <div className="make-sure">扫一扫二维码，快速确认我的信息</div>
                </div>
            </div>

        )
    }

}

export default MyQrCode;