import React from 'react';
import './Button.css';

/**
 Props:
 displayMode {string}: 'normal' / 'danger' / 'success'
 text {string} 
 clickHandler: callback function to invoke on click 
*/

const Button = (props) => {
  
  const {text, displayMode, clickHandlerCallback} = props;

  return (
    <button 
      className={`btn-base ${displayMode}`} 
      onClick={clickHandlerCallback}>{text}
    </button>
  );
}

export default Button