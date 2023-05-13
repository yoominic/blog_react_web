import React, { Component } from "react";
import Logo from "../logo/logo";
import axios from "axios";
import './footer.css';
import qrcode_for_gh_a4cb057798cf_258 from "./img/qrcode_for_gh_a4cb057798cf_258.jpeg";
import douyin from "./img/douyin.png";
import wexin from "./img/wexin.png";
import { Card, Col, Row } from 'antd';

const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            footer_logo: null
        }
    }


    async componentDidMount() {
        var _this = this;
        const cacheCarousel = localStorage.getItem("footer_logo");
        if (cacheCarousel) {
            const obj = JSON.parse(cacheCarousel);
            _this.setState({ footer_logo: obj });
        } else {
            const carouselResponse = await axios.get('http://api.taoboyang.fun/v1/globalConfig/get?name=' + 'footer_logo');
            if (carouselResponse.data.code === 200) {
                _this.setState({ footer_logo: carouselResponse.data.data.value });
            }
            localStorage.setItem("footer_logo", JSON.stringify(carouselResponse.data.data.value));
        }
    }

    render() {
        return (<div className="footer" >

            <img className="footer-img" src={this.state.footer_logo} alt="footer_logo"></img>
            <div className="contact-img">

                <ul>
                    <li><img src={qrcode_for_gh_a4cb057798cf_258} /><span>微信公众号</span></li>
                    <li><img src={wexin} /><span>微信</span></li>
                    <li><img src={douyin} /><span>抖音</span></li>
                </ul>

            </div>

            <div className="footer-copyright"> Copyright © 2023 深夜Blog&nbsp;<a href="https://beian.miit.gov.cn/" target="_blank" rel="link noopener">陇ICP备17001645号-3</a>&nbsp;由<a href="#" title="" target="_blank"  rel="noopener"><strong> 深夜学长 </strong></a>强力驱动&nbsp; </div>


            <Row gutter={16}>
                <Col span={8}>
                    <Card className="card" size="small" title="技术栈" bordered={false}>
                        <p>SpringBoot</p>
                        <p>React</p>
                        <p>Vue</p>
                        <p>Mysql</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size="small" className="card" title="我的服务" bordered={false}>
                        <p>开发能力</p>
                        <p>应用能力</p>
                        <p>稳定可靠</p>
                        <p>技术支持</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size="small" className="card" title="关于网站" bordered={false}>
                        <p>博客文章</p>
                        <p>奇思妙想</p>
                        <p>个人简历</p>
                        <p>关于网站</p>
                    </Card>
                </Col>
            </Row>




        </div>)
    }


}

export default Footer;