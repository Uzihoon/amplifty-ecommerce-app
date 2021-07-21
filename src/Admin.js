import API from '@aws-amplify/api';
import { Button, Input } from 'antd';
import React, { useState } from 'react';

const initialState = {
  name: '',
  price: ''
};

export default function Admin() {
  const [itemInfo, updateItemInfo] = useState(initialState);
  function updateForm({ target: { name, value } }) {
    const formData = {
      ...itemInfo,
      [name]: value
    };
    updateItemInfo(formData);
  }

  async function addItem() {
    try {
      const data = {
        body: { ...itemInfo, price: parseInt(itemInfo.price) }
      };
      updateItemInfo(initialState);
      await API.post('ecommerceapi', '/products', data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Input
        name='name'
        onChange={updateForm}
        value={itemInfo.name}
        placeholder='Item name'
      />
      <Input
        name='price'
        onChange={updateForm}
        value={itemInfo.price}
        placeholder='Item price'
      />
      <Button onClick={addItem}>Add Product</Button>
    </div>
  );
}
