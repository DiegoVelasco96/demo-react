import React, { Component } from 'react';
import {
    Menu,
    Icon
} from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

class MenuApp extends Component {
    render() {
        return (
            <Menu mode="horizontal" >
                <SubMenu title={<span><Icon type="appstore" /> Configuration</span>}>
                    <Menu.Item key="categories">
                        <Link  to="/categories">Categories</Link>
                    </Menu.Item>
                    <Menu.Item key="products">
                        <Link  to="/">Products</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

export default MenuApp;