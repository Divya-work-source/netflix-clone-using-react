// src/components/background.js
import React from 'react';
import './background.css'; // Optional: if you have styles

export default function Background({ children, ...restProps }) {
  return <div className="background" {...restProps}>{children}</div>;
}
