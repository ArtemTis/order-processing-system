import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Layout, Menu, Button, theme } from 'antd';
import { Link, Navigate, Outlet } from 'react-router-dom';
import menu from '../shared/assets/Menu.svg'
import link from '../shared/assets/link.svg'
import book from '../assets/sider/Book.svg'
import teacher from '../assets/sider/Teacher.svg'
import profile from '../assets/sider/Profile.svg'
import logout from '../assets/sider/Logout.svg'
import { ACCOUNT_PATH, CHATS_PATH, LOGIN_PATH, PROFILE_PATH, SETTINGS_PATH } from '../shared/config/routerConfig/routeConstants';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../entities/auth/selectors';
import { CommentOutlined, MessageOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { userApi } from '../entities/auth/userApi';
import { setCredentials } from '../entities/auth/authSlice';


const { Header, Sider, Content } = Layout;


const AppSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // const isAuthorised = !!useSelector(selectCurrentUser)
    // if (!isAuthorised) {
    //     return <Navigate to={`/${ACCOUNT_PATH}/${LOGIN_PATH}`} />
    // }
    const dispatch = useDispatch();

    const [sendMe, {data: userData}] = userApi.useGetMeMutation();

    useEffect(()=> {
        sendMe();
        // dispatch(setCredentials(userData?.data))
    },[])
    

    const isAuthorised = !!useSelector(selectCurrentUser)
    if (!isAuthorised) {
      return <Navigate to={`/${ACCOUNT_PATH}/${LOGIN_PATH}`} />
    }

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
                    defaultSelectedKeys={['3']}
                    items={[
                        {
                            key: '1',
                            icon: <CommentOutlined />,
                            label: <Link to={CHATS_PATH}>Чаты</Link>,
                        },
                        {
                            key: '2',
                            icon: <SettingOutlined />,
                            label: <Link to={SETTINGS_PATH}>Настройки</Link>,
                        },
                        {
                            key: '3',
                            icon: <UserOutlined />,
                            // label: <Link to={ACCOUNT_PATH}>Личный кабинет</Link>,
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
    /* background: #F5F6F8 !important; */
    height:100vh;
    overflow: hidden;

    & ul {
        /* background: #F5F6F8 !important; */
        /* background: #424242 !important; */
        background: #f0f0f0 !important;

        
        &.ant-menu-light.ant-menu-root.ant-menu-inline{
            border-inline-end: none !important;
        }

        .ant-menu-item-selected{
            /* background-color: #6D31ED; */
            /* background-color: #3b4a8f; */
            background-color: #667eea;
            color: #eeeeee !important;

            transition: colo;
        }

        /* .ant-menu-item-active{
            background: #dadce2 !important;
            color: #667eea !important;
        } */
    }

    & li {
        padding: 18px 24px !important;
        height: 64px !important;
        margin: 0 !important;
        width: auto !important;

        color: #667eea !important;
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
    
    a{
        font-size: 16px;
    }
`

const LayoutStyle = styled(Layout)`
    height: 100% !important;
    background: white;
`