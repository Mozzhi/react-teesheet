import React, { Component } from 'react';
import './style.scss'
let Swiper = window.Swiper;

class Picker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerData: {},
        }
    }
    handleVal() {
        this.props.handlePicker(this.state.pickerData, false);
    }

    componentWillReceiveProps() {
        this.initSwiper();
    }
    // componentDidUpdate(){
    //     this.initSwiper();
    // }
    initSwiper() {
        if(this.swiper){
            // this.swiper.slideTo(0, 0)
            this.swiper.destroy()
            this.swiper = null;
        }
        this.swiper = new Swiper(this.refs[this.props.refs], {
            direction : 'vertical',
            on: {
                slideChangeTransitionEnd: () => {
                    this.setState({
                        pickerData: this.props.data[this.swiper.activeIndex]
                    })
                }
            }
        });
    }
    render() {
        let pickerClass = `picker-boxs ${this.props.show ? 'picker-show' : ''}`;
        return (
            <div className={pickerClass} >
                <div className="picker-mask"></div>
                <div className="picker-content">
                    <div className="head-bar" data-flex="dir:left box:justify">
                        <div>取消</div>
                        <div></div>
                        <div onClick={this.handleVal.bind(this)}>确定</div>
                    </div>
                    <div className="white-mask mask-top"></div>
                    <div className="white-mask mask-middle"></div>
                    <div className="white-mask mask-bottom"></div>
                    <div className="swiper-box">
                        <div className="swiper-container" ref={this.props.refs}>
                            <div className="swiper-wrapper">
                                {
                                    this.props.data.map((slide, index) => {
                                        return (
                                            <div className="swiper-slide" key={index}>{slide.show_txt}</div>
                                        )
                                    })

                                }

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default Picker;