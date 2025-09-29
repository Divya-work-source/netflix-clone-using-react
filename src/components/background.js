// src/components/background.js
import React from 'react';


export default function Background({ children, ...restProps }) {
  return <div className="background" {...restProps}>{children}</div>;
}
