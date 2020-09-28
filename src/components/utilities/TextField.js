import React from 'react';
import './TextField.css';

/**
 Props:
 mode: {string}: 'edit' / 'display' (render text in editable / read only ui)
 content: {object}: {label: '', text: ''}
 onInputChange callback function (when created in 'edit' mode) 
*/

const TextField = (props) => {

  const {mode ,content, onInputChangeCallback} = props;

  // Edit mode -> render read only text view, Display mode -> render editable text area
  function renderTextByMode(){
    switch(mode){
      case 'display':
        return (
          <span 
            className="display-mode">
            {content.text}
          </span>
        );
      case 'edit':
        return (
          <textarea 
            name={content.label.toLowerCase()}
            className="edit-mode" 
            value={content.text} 
            onChange={onInputChangeCallback}
          />
        );
      default:
        console.log('TextField component rendered in invalid mode');
    }
  }

  return (
    <div className="text-field-container">
      <span 
        className="label">
        {content.label}
      </span>
      <div 
        className="text">
        {renderTextByMode()}
      </div> 
    </div>
  )
}

export default TextField;