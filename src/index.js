import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Layout, Space } from 'antd';
import AppHeader from './components/header/header';
import AppContent from './components/content/content';
import AppFooter from './components/footer/footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppLogin from './components/login/login';
import AppRegister from './components/register/register';
import AppDetail from './components/details/details';
const { Header, Footer, Sider, Content } = Layout;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 60,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#e5ebf4',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 2350,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#ffffff',
};
const footerStyle = {
  textAlign: 'center',
  height: 320,
  color: '#fff',
  backgroundColor: '#00132e',
};

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <div>
    <BrowserRouter>
      <Layout>
        <Header style={headerStyle}><AppHeader /></Header>
        <Content style={contentStyle}>

          <Switch>
            <Route  path="/:id?" component={AppContent} />
            <Route path="/login" component={AppLogin} />
            <Route path="/register" component={AppRegister} />
            <Route path="/details" component={AppContent} />
          </Switch>

        </Content>
        <Footer style={footerStyle}><AppFooter></AppFooter></Footer>
      </Layout>


    </BrowserRouter>



  </div>
);

