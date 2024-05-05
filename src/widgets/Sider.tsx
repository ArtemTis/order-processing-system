import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout, Menu, Button, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import menu from '../shared/assets/Menu.svg'
import link from '../shared/assets/link.svg'
import book from '../assets/sider/Book.svg'
import teacher from '../assets/sider/Teacher.svg'
import profile from '../assets/sider/Profile.svg'
import logout from '../assets/sider/Logout.svg'
import { CHATS_PATH, PROFILE_PATH, SETTINGS_PATH } from '../shared/config/routerConfig/routeConstants';


const { Header, Sider, Content } = Layout;


const AppSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <LayoutStyle>
            <SiderStyle trigger={null} collapsible collapsed={false} >
                {/* <ButtonClose
                    type="text"
                    icon={collapsed ? <img src={menu} alt='menu icon' /> : <img src={link} alt='link icon' />}
                    onClick={() => setCollapsed(!collapsed)}
                    children={collapsed ? '' : 'Свернуть меню системы'}
                    style={{ overflow: 'hidden', height: '75px' }}
                /> */}
                <MenuStyle
                    mode="inline"
                    // defaultSelectedKeys={['2']}
                    items={[
                        {
                            key: '1',
                            icon: <img src="" alt='teacher icon' />,
                            label: <Link to={CHATS_PATH}>Обучение</Link>,
                        },
                        {
                            key: '2',
                            icon: <img src="" alt='book icon' />,
                            label: <Link to={SETTINGS_PATH}>Тесты</Link>,
                        },
                        {
                            key: '3',
                            icon: <img src="" alt='profile icon' />,
                            label: <Link to={PROFILE_PATH}>Личный кабинет</Link>,
                        },
                    ]}
                />
            </SiderStyle>
            <Content 
             style={{
                overflow: 'auto',
                height: '100vh',
            }}>
                <Outlet />
            </Content>
        </LayoutStyle>
    );
};

export default AppSider;


const ButtonClose = styled(Button)`
  width: 100%;
  /* background: rgba(68, 70, 86, 0.1) !important; */
  /* color: #444656 !important; */
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    width: 100% !important;
  }

  &.ant-btn.ant-btn-icon-only{
    width: 100% !important;
  }

`

const SiderStyle = styled(Sider)`
    background: #F5F6F8 !important;
    height:100vh;
    overflow: hidden;

    & ul {
        background: #F5F6F8 !important;
    }

    & li {
        padding: 18px 24px !important;
        height: 64px !important;
    }

    span{
        display: flex !important;
        align-items: center;
    }

`

const MenuStyle = styled(Menu)`
    height: 100%;
    background: #F5F6F8;

    .ant-menu-item .ant-menu-item-selected{
        margin-top: 400px !important;
    }
`

const LayoutStyle = styled(Layout)`
    height: 100% !important;
    background: white;
`