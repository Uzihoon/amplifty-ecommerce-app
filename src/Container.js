import React from 'react';

export default function Container({ children }) {
  return <div style={containerStyle}>{children}</div>;
}

const containerStyle = {
  width: 900,
  maring: '0 auto',
  padding: '20px 0'
};
