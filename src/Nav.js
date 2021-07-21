import { Hub } from '@aws-amplify/core';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import checkUser from './checkUser';
import { HomeOutlined, UserOutlined, ProfileOutlined } from '@ant-design/icons';

export default function Nav(props) {
  const { current } = props;
  const [user, updateUser] = useState({});
  useEffect(() => {
    checkUser(updateUser);
    Hub.listen('auth', data => {
      const {
        payload: { event }
      } = data;
      console.log('event: ', event);
      if (event === 'signIn' || event === 'signOut') checkUser(updateUser);
    });
  }, []);

  return (
    <div>
      <Menu selectedKeys={[current]} mode='horizontal'>
        <Menu.Item key='home'>
          <Link to='/'>
            <HomeOutlined /> Home
          </Link>
        </Menu.Item>
        <Menu.Item key='profile'>
          <Link to='/profile'>
            <UserOutlined /> Profile
          </Link>
        </Menu.Item>
        {user.isAuthorized && (
          <Menu.Item key='admin'>
            <Link to='/admin'>
              <ProfileOutlined /> Admin
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </div>
  );
}
