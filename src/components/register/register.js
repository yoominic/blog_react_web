import React, { Component } from "react";
import './register.css';
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Input } from 'antd';
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';
import axios from "axios";
import { Upload, message } from 'antd';
import uploadIcon from './upload_icon.png';
const nonChineseRegex = /^[^\u4e00-\u9fa5]+$/; // 表示只能输入以中文字符以外的字符
var avatarUrl = "";





class Register extends Component {



    constructor(props) {
        super(props);
        this.state = {
            avatar: null,
            buttonLoading: false
        }
    }


    onUploadSuccess = (values) => {

        const fileObj = values.file;
        if (fileObj) {
            const response = values.file.response;
            if (response) {
                const code = response.code;
                if (code === 200) {
                    this.setState({ avatar: response.data });
                    avatarUrl = response.data;
                }
            }
        }
    };


    onFinishFailed = (values) => {
        var _this = this;
        _this.setState({ buttonLoading: false });
    }

    onFinish = (values) => {
        var _this = this;
        _this.setState({ buttonLoading: true });
        const username = values.username;
        const password = values.password;
        const nickName = values.nickName;

        axios.post('http://api.taoboyang.fun/v1/user/register', {
            account: username,
            password: password,
            avatar: avatarUrl,
            nickName: nickName
        })
            .then(function (response) {
                console.log(response);
                const code = response.data.code;
                if (code === 200) {

                    message.success('注册成功!请登录');
                    setTimeout(function () {
                        window.location.href = "/login";
                    }, 3000); // 3秒钟后执行

                } else {
                    message.error(response.data.msg);
                    _this.setState({ buttonLoading: false });
                }
            });
    };


    componentDidMount() {


        const pathName = window.location.pathname;
        if (pathName === '/register') {
            const height = window.innerHeight+200;
            const contentEl = document.getElementsByClassName('ant-layout-content')[0];
            const globalEl = document.getElementsByClassName('global')[0];
            contentEl.style.minHeight=height + 'px';
            contentEl.style.height = height + 'px';
            globalEl.style.minHeight = height + 'px';

        }


    }



    render() {





        return (
            <div className="global">

                <div className="register-area">

                    <Alert
                        className="alert"
                        banner
                        type="info"
                        message={
                            <Marquee pauseOnHover gradient={false}>
                                I can be a React component, multiple React components, or just some text.
                            </Marquee>
                        }
                    />




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
                            className="password-avatar"
                            name="file"
                            valuePropName="fileList"
                            rules={[{ required: true, message: '请上传头像' }]}
                            getValueFromEvent={(e) => {
                                if (Array.isArray(e)) {
                                    return e;
                                }
                                return e && e.fileList;
                            }}
                        >
                            <Upload
                                name="avatar"
                                action="apihttp://api.taoboyang.fun/v1/file/upload"
                                listType="picture-circle"
                                showUploadList={false}
                                onChange={this.onUploadSuccess}

                            // beforeUpload={() => false} // 取消默认上传行为
                            >
                                {this.state.avatar ? (
                                    <img src={this.state.avatar} alt="avatar" style={{ width: '100%', borderRadius: '50%' }} />
                                ) : (
                                    <div><img style={{ width: '25px', height: '25px', marginTop: '10px' }} src={uploadIcon}></img></div>
                                )}
                            </Upload>
                        </Form.Item>

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
                            className="password-nickName"
                            label="昵称"

                            name="nickName"

                        >
                            <Input showCount maxLength={20} allowClear="true" />
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
                            className="register-item"
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" loading={this.state.buttonLoading} disabled={this.state.buttonLoading} htmlType="submit">
                                注册
                            </Button>
                        </Form.Item>
                    </Form>


                    <Link to="/login">
                        <div className="Jump-register">已注册？去登录</div>
                    </Link>


                </div>

            </div>)



    }

}

export default Register;
