import React from "react";
import './content.css';
import axios from "axios";
import { Carousel } from 'antd';
import { Tabs } from 'antd';
import AppList from "../list/lists";
import AppDetails from "../details/details";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";



const onChange = (key) => {
    // console.log(key);
};


var tabs = [];




class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselData: [],
            labelData: [],
            activekey: "1"
        }
    }

    async componentDidMount() {
        var _this = this;
        const { id } = this.props.match.params;
        if (id) {
            _this.setState({ activekey: String(id) })
        }

        try {

            //请求轮播图
            const cacheCarousel = localStorage.getItem("cacheCarousel");
            if (cacheCarousel) {
                const obj = JSON.parse(cacheCarousel);
                _this.setState({ carouselData: obj });
            } else {

                const carouselResponse = await axios.get('http://api.taoboyang.fun/v1/carousel/list');
                if (carouselResponse.data.code === 200) {
                    _this.setState({ carouselData: carouselResponse.data.data });
                }
                localStorage.setItem("cacheCarousel", JSON.stringify(carouselResponse.data.data));
            }

            //请求文章分类
            const labelResponse = await axios.get('http://api.taoboyang.fun/v1/articleLabel/list')
            if (labelResponse.data.code === 200) {
                const list = labelResponse.data.data;
                const items = [];
                for (let i = 0; i < list.length; i++) {
                    let obj = {};
                    obj.key = String(list[i].id);
                    obj.children =

                        <BrowserRouter>
                            <Switch>
                                <Route exact path="/:id?"  ><AppList id={list[i].id}></AppList></Route>
                                <Route path="/details/:id?" component={AppDetails} ></Route>
                            </Switch>
                        </BrowserRouter>;


                    obj.label = String(list[i].label);
                    items.push(obj);
                }
                _this.setState({
                    labelData: items

                });
                tabs = items;
            }
        } catch (error) {
            console.log(error);
        } finally {
            const pathname = window.location.pathname;
            if (pathname != "/") {

                const contentEl = document.getElementsByClassName('ant-layout-content')[0];
                const contentHolder = document.getElementsByClassName('ant-tabs-content-holder')[0];
                contentEl.style.height=600+contentHolder.clientHeight+"px";
                contentEl.style.minHeight=600+contentHolder.clientHeight+"px";
             
            }
        }
    }




    carousel() {
        return this.state.carouselData.map(item => {
            return (
                <div className="carousel-item" key={item}>
                    <img className="carousel-item-img" src={item.picUrl} alt="banner-log"></img>
                </div>
            )
        })
    }

    onTab(key) {
        var _this = this;
        _this.setState({ activekey: String(key) })
        const pathname = window.location.pathname;
        if (pathname.includes('/details')) {

           window.location.href='/'+key;
         
        }
    }


    render() {
        return (
            <BrowserRouter>
                <div>

                    <Carousel autoplay className="carousel">
                        {this.carousel()}
                    </Carousel>

                    <Tabs size="large" onTabClick={this.onTab.bind(this)} className="tab" centered="true" activeKey={this.state.activekey} items={tabs} onChange={onChange} />

                </div>
            </BrowserRouter>
        )
    }

}


export default Content;