import React, { Component } from "react";

import './login.css';
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import { message, Space } from 'antd';
import axios from "axios";
import { withRouter } from 'react-router-dom';
const nonChineseRegex = /^[^\u4e00-\u9fa5]+$/; // 表示只能输入以中文字符以外的字符



class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {
            buttonLoading: false,
        }
    }


    onFinish = (values) => {
        var _this = this;
        _this.setState({ buttonLoading: true });
        const password = values.password;
        const username = values.username;
        axios.post('http://api.taoboyang.fun/v1/user/login', {
            account: username,
            password: password
        })
            .then(function (response) {
                const code = response.data.code;
                if (code === 200) {
                    const data = response.data.data;
                    message.success('登录成功,欢迎回来');
                    window.location.href = "/";
                    localStorage.setItem('userinfo', JSON.stringify(data));
                }
                message.error(response.data.msg)
                _this.setState({ buttonLoading: false });
            })
            .catch(function (error) {
                _this.setState({ buttonLoading: false });
            })

    };
    onFinishFailed = (errorInfo) => {
        var _this = this;
        _this.setState({ buttonLoading: false });
    };


 
    componentDidMount() {
        const pathName=window.location.pathname;
        if(pathName==='/login')
        {
            const height = window.innerHeight+200;
            const contentEl = document.getElementsByClassName('ant-layout-content')[0];
            const globalEl = document.getElementsByClassName('global')[0];
            contentEl.style.height = height+'px';
            contentEl.style.minHeight = height+'px';
            globalEl.style.minHeight =height+'px';
            globalEl.style.height =height+'px';
        }
        

    }



    render() {

        return (<div className="global">

            <div className="login-area">

                <p className="login-area-title">
                    欢迎回来
                </p>


                <Form
                    className="form"
                    name="basic"

                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 580,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish.bind(this)}
                    onFinishFailed={this.onFinishFailed.bind(this)}
                    autoComplete="off"
                >
                    <Form.Item
                        className="username-item"
                        label="用户名"
                        name="username"

                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            }, {
                                pattern: nonChineseRegex,
                                message: '用户名请勿包含中文'
                            }, {
                                min: 5,
                                message: '长度请大于6个字符'
                            }
                        ]}
                    >
                        <Input allowClear="true" />
                    </Form.Item>


                    <Form.Item
                        className="password-item"
                        label="密码"

                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input.Password allowClear="true" />
                    </Form.Item>
                    <Form.Item
                        className="rember-item"
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>记住俺</Checkbox>
                    </Form.Item>
                    <Form.Item
                        className="login-item"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button className="btn" type="primary" loading={this.state.buttonLoading} disabled={this.state.buttonLoading} htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>

                <Link to="/register">
                    <div className="Jump-login">还没注册？去注册</div>
                </Link>

            </div>

        </div>)



    }

}

export default withRouter(Login);
