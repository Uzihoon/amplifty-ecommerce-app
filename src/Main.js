import API from '@aws-amplify/api';
import { List } from 'antd';
import React, { useEffect, useState } from 'react';
import checkUser from './checkUser';
import Container from './Container';

export default function Main() {
  const [state, setState] = useState({ products: [], loading: true });
  const [user, updateUser] = useState({});

  let didCancel = false;

  useEffect(() => {
    getProducts();
    checkUser(updateUser);
    return () => (didCancel = true);
  }, []);

  async function getProducts() {
    const data = await API.get('ecommerceapi', '/products');
    console.log(data);
    if (didCancel) return;
    setState({
      products: data.data.Items,
      loading: false
    });
  }

  async function deleteItem(id) {
    try {
      const products = state.products.filter(p => p.id !== id);
      setState({ ...state, products });
      await API.del('ecommerceapi', '/products', { body: { id } });
      console.log('successfully deleted items');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <List
        itemLayout='horizontal'
        dataSource={state.products}
        loading={state.loading}
        renderItem={item => (
          <List.Item
            actions={
              user.isAuthorized
                ? [
                    <p onClick={() => deleteItem(item.id)} key={item.id}>
                      delete
                    </p>
                  ]
                : null
            }
          >
            <List.Item.Meta title={item.title} description={item.price} />
          </List.Item>
        )}
      />
    </Container>
  );
}
