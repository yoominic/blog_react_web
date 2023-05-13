import React, { Component } from "react";
import { Divider, Typography } from 'antd';
import axios from "axios";
import './details.css';
import AppComment from "../comment/comment";

const { Title, Paragraph, Text, Link } = Typography;



    


class Detail extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            title: null,
            content: null,
            createTime: null
        }
    }



    async componentDidMount() {
        
        const pathName = window.location.pathname;

        if (pathName.includes('/details')) {

            const contentEl = document.getElementsByClassName('ant-layout-content')[0];
            contentEl.style.minHeight = 2400 + 'px';
        }

        var _this = this;
        const { id } = this.props.match.params;


        // 支持async/await用法
      
            try {
                const response = await axios.get("http://api.taoboyang.fun/v1/article/get?id=" + id)
                const code = response.data.code;
                if (code === 200) {
                    _this.setState({
                        title: response.data.data.title,
                        content: response.data.data.content,
                        createTime: response.data.data.createTime
                    })
                }
            } catch (error) {
                console.error(error);
            }
        

    }

    componentDidUpdate(){
        
        const height = this.myRef.current.clientHeight;
       
        const pathName = window.location.pathname;

        if (pathName.includes('/details')) {

            const contentEl = document.getElementsByClassName('ant-layout-content')[0];
            const contentAreaEl = document.getElementsByClassName('content-area')[0];
            const commentEL = document.getElementsByClassName('comment-area')[0];
            contentEl.style.minHeight = '';
            
            contentEl.style.height = (1200+height)+'px';
            commentEL.style.height=500+'px';
            contentAreaEl.style.height=(500+height)+'px';
        }
        window.scrollTo(0,500);
    }
    
    render() {

        return (
            <div className="content-area">
                <Typography className="Typography">
                    <Title level={2}>{this.state.title}</Title>
                    <Text type="secondary">{this.state.createTime}</Text>
                    <div className="text-content">

                        <div className="text-blog" ref={this.myRef} dangerouslySetInnerHTML={{ __html: this.state.content }} />



                    </div>

                </Typography>
                <AppComment></AppComment>
            </div>
        )
    }
}

export default Detail;