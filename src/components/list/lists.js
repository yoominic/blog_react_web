import React from "react";
import { Avatar, List, Radio, Space } from 'antd';
import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined
} from '@ant-design/icons';
import './lists.css';
import axios from "axios";
import AppDetals from "../details/details";
import { Switch, Route, Link } from 'react-router-dom';


const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: []
    }
  }

  componentDidMount() {


    const pathName = window.location.pathname;
    
    if (pathName === '/') {
        
        const contentEl = document.getElementsByClassName('ant-layout-content')[0];
        contentEl.style.minHeight =1000+'px';
        contentEl.style.height =1750+'px';
    }


    const labelId = this.props.id;
    var _this = this;
    axios.get('http://api.taoboyang.fun/v1/article/list?id=' + labelId)
      .then(function (response) {

        const code = response.data.code;
        if (code === 200) {
          _this.setState({ listData: response.data.data })
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

  truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
  }


  getList() {
    return (<List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          // console.log(page);
        },
        align: "center",
        pageSize: 5,
      }}
      dataSource={this.state.listData}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          extra={
            <img
              width={320}
              alt="logo"
              src={item.coverPic}
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<Link to={`/details/${item.id}`}>{item.title}</Link>}
            description={item.description}
          />
          <div className="content">{this.truncate(item.content, 100)}</div>
        </List.Item>
      )}
    />)

  }






  render() {



    let listDatas = this.state.listData;
    for (let index = 0; index < listDatas.length; index++) {
      listDatas[index].description = "发表于 " + listDatas[index].createTime;
    }

    if (this.state.currentPage === "details") {
      return <AppDetals />;
    } else {

      return (

        <div>



          {this.getList()}




        </div>

      )
    }
  }


}


export default Lists;