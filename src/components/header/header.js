import React, { Component } from "react";

import { Menu } from 'antd';

import './header.css';

import { Button, Space } from 'antd';
import axios from "axios";
import Logo from "../logo/logo";
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import Content from "../content/content";

function getCookie(name) {
    const cookieStr = document.cookie;
    const cookies = cookieStr.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return null;
}
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            logo: null,
            isUserLoggedIn: false,
            avatar: null,
            nickName: null
        }
    }



    componentDidMount() {

        const satoken = getCookie("satoken");


        var _this = this;
        //请求网站logo
        if (satoken) {
            const userinfo=JSON.parse(localStorage.getItem("userinfo"));
            if(userinfo)
            {
                _this.setState({
                    isUserLoggedIn: true,
                    avatar:userinfo.avatar,
                    nickName:userinfo.nickName,
                });
            }
        
        }
        
        


        //请求菜单
        axios.get('http://api.taoboyang.fun/v1/headerMenu/list')
            .then(function (response) {
                const code = response.data.code;
                if (code === 200) {
                    let menuArray = [];
                    const array = response.data.data;
                    for (let index = 0; index < array.length; index++) {

                        let obj = {
                            label: null,
                            key: null
                        }
                        obj.label = array[index].label;
                        obj.key = array[index].id;
                        menuArray.push(obj);
                    }
                    _this.setState({ data: menuArray });

                }

            })
            .catch(function (error) {
                // 处理错误情况
                console.log(error);
            })
            .finally(function () {
                // 总是会执行
            });
    }

    onClick(e) {
        console.log('click ', e.key);
    };

    onLogin() {
        window.location.href = "/login";
    }


    render() {

        return (
            <div className="header" >
                <a href="/"><Logo></Logo></a>
                <Menu defaultSelectedKeys="4" onClick={this.onClick} className="menu" mode="horizontal" items={this.state.data} ></Menu>
                {this.state.isUserLoggedIn ? (
                    <div className="user-info">
                        <img style={{borderRadius:'50%'}} src={this.state.avatar} />
                        <span>{this.state.nickName}</span>
                    </div>
                ) : (
                    <Button className="header-button" type="primary" onClick={this.onLogin}   ><p>登录</p></Button>

                )}
            </div>



        )
    }


}

export default Header;