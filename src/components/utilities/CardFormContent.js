import React from 'react';
//Import Components
import TextField from './TextField';

const CardFormContent = (props) => {

  const {questionValue, answerValue, onInputChangeCallback} = props;

    return(
      <div>
        <div className="field-container">
          <TextField 
            mode="edit" 
            content={{label: 'Question', text: questionValue}} 
            onInputChangeCallback={onInputChangeCallback}/>
        </div>
        <div className="field-container">
          <TextField 
            mode="edit" 
            content={{label: 'Answer', text: answerValue}} 
            onInputChangeCallback={onInputChangeCallback}/>
        </div>
      </div>
    );
}
export default CardFormContent;