import React, { Component } from 'react';
import './style.scss';
import {HttpRequest} from "../../api";
import QrCodeWithLogo from 'qr-code-with-logo'

class MyQrCode extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.getUserInfo();
    }

    getUserInfo() {
        HttpRequest({
            url:'Users',
            callback: (res) => {
                console.log(res)
                const myCanvas = document.createElement('canvas')
                document.getElementById('qr').appendChild(myCanvas)

                QrCodeWithLogo.toCanvas({
                    canvas: myCanvas,
                    content: res.data.tel,
                    width: 300,
                    logo: {
                        src: res.data.user_pic,
                        radius: 8,
                    }
                })
            }
        })
    }
    render() {
        return (
            <div id="qr">

            </div>
        )
    }

}

export default MyQrCode;