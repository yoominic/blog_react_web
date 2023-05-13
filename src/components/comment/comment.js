import { List, Form, Tooltip, Input, Button } from 'antd';
import { Comment } from '@ant-design/compatible';
import React from 'react';
import './comment.css';
import axios from 'axios';
import { message } from 'antd';
import { useState, useEffect, useRef } from 'react';
import useForm from '@arco-design/web-react/es/Form/useForm';


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






const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const onKeyClick = (values) => {
    const satoken = getCookie('satoken');
    if (!satoken) {
        message.error('请您先登录～');
        setTimeout(function () {
            window.location.href = "/login";
        }, 1500);

    }
};



const App = () => {

    let dataArray = [];

    const [data, setData] = useState([]);

    const [form] = useForm();

    const onFinish = (values) => {




        const pathname = window.location.pathname;
        const params = pathname.split('/')[2];
        const comments = values.comments;
        axios.post('http://api.taoboyang.fun/v1/articleComments/add', {
            content: comments,
            articleId: params
        })
            .then(function (response) {
                const code = response.data.code;
                if (code === 200) {
                    message.success('评论成功');



                    axios.get('http://api.taoboyang.fun/v1/articleComments/list?id=' + params)
                        .then(function (response) {
                            const code = response.data.code;
                            if (code === 200) {
                                const array = response.data.data;

                                for (let i = 0; i < array.length; i++) {
                                    let obj = {};
                                    obj.author = array[i].user.nickName;
                                    obj.avatar = array[i].user.avatar;
                                    obj.content = (<p>{array[i].content}</p>);
                                    obj.datetime = (
                                        <Tooltip title={array[i].createTime}>
                                            <span>{array[i].time}</span>
                                        </Tooltip>
                                    );
                                    dataArray.push(obj);
                                }
                                setData(dataArray);


                                form.setFieldsValue({
                                    comments: ''
                                });


                            }
                        }).finally(function () {
                            document.getElementById('form-horizontal').reset();
                            if (dataArray.length > 1) {
                                const contentEl = document.getElementsByClassName('ant-layout-content')[0];

                                const contentBlog = document.getElementsByClassName('text-blog')[0];

                                const height = contentBlog.clientHeight;

                                contentEl.style.minHeight = '';
                                switch (dataArray.length) {
                                    case 2:
                                        contentEl.style.height = (1250 + height) + 'px';
                                        // contentAreaEl.style.minHeight =  1200 + 'px';
                                        break;
                                    case 3:
                                        contentEl.style.height = (1350 + height) + 'px';

                                        break;
                                    case 4:
                                        contentEl.style.height = (1450 + height) + 'px';

                                        break;
                                    case 5:
                                        contentEl.style.height = (1550 + height) + 'px';
                                        break;
                                    default: contentEl.style.minHeight = (1550 + height) + 'px';
                                }


                            }

                        });


                } else if (code === 401) {
                    message.error('请您先登录～');
                    setTimeout(function () {
                        window.location.href = "/login";
                    }, 1500);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {

            });

    };


    useEffect(() => {
        const pathname = window.location.pathname;
        const params = pathname.split('/')[2];
        axios.get('http://api.taoboyang.fun/v1/articleComments/list?id=' + params)
            .then(function (response) {
                const code = response.data.code;
                if (code === 200) {
                    const array = response.data.data;

                    for (let i = 0; i < array.length; i++) {
                        let obj = {};
                        obj.author = array[i].user.nickName;
                        obj.avatar = array[i].user.avatar;
                        obj.content = (<p>{array[i].content}</p>);
                        obj.datetime = (
                            <Tooltip title={array[i].createTime}>
                                <span>{array[i].time}</span>
                            </Tooltip>
                        );
                        dataArray.push(obj);
                    }
                    setData(dataArray);
                }
            }).finally(function () {

                if (dataArray.length > 1) {
                    const contentEl = document.getElementsByClassName('ant-layout-content')[0];

                    const contentBlog = document.getElementsByClassName('text-blog')[0];

                    const height = contentBlog.clientHeight;

                    contentEl.style.minHeight = '';
                    switch (dataArray.length) {
                        case 2:
                            contentEl.style.height = (1250 + height) + 'px';
                            // contentAreaEl.style.minHeight =  1200 + 'px';
                            break;
                        case 3:
                            contentEl.style.height = (1350 + height) + 'px';

                            break;
                        case 4:
                            contentEl.style.height = (1450 + height) + 'px';

                            break;
                        case 5:
                            contentEl.style.height = (1550 + height) + 'px';
                            break;
                        default: contentEl.style.height = (1550 + height) + 'px';
                    }


                }

            });
    }, []);


    return (

        <div className='comment-area'>

            <Form
                className='form-horizontal'
                name="basic"
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 28 }}
                id="form-horizontal"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onClick={onKeyClick}
                autoComplete="off"
            >
                <Form.Item
                    className='input'
                    label="评论"
                    name="comments"

                    rules={[{ required: true, message: '善语结善缘,恶语伤人心~' }]}
                >
                    <Input.TextArea showCount='true' maxLength='200' />
                </Form.Item>
                <Button className='button' type="primary" htmlType="submit">
                    提交
                </Button>
            </Form>


            <List
                className="comment-list"
                header={<p>{data.length} 条评论</p>}
                itemLayout="horizontal"
                dataSource={data}

                pagination={{
                    onChange: (page) => {
                        // console.log(page);
                    },
                    align: "center",
                    pageSize: 5,
                }}
                renderItem={(item) => (
                    <li>
                        <Comment
                            actions={item.actions}
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.datetime}
                        />
                    </li>
                )}
            />
        </div>

    )
};
export default App;