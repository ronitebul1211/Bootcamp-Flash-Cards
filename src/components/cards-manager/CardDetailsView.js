import React from 'react';
//Import Components
import TextField from '../utilities/TextField';
import Button from '../utilities/Button'


const CardDetailsView = (props) => {
  
  const {cardData, setCardDisplayModeCallback, updateCardDataInEndpointCallback} = props;

  //Invoke function on Card parent to set Edit display mode
  function handleEditClick(){
    setCardDisplayModeCallback('edit');
  }

  //Invoke function on CardManager delete record from endpoint
  function handleDeleteClick(){
    updateCardDataInEndpointCallback('delete', cardData);
  }
 
  return (
    <div className="card-view-container">
      <div>
        <div className="field-container">
          <TextField 
            mode="display" 
            content={{label: 'Question', text: cardData.question}}
          />
        </div>
        <div className="field-container">
          <TextField  
            mode="display" 
            content={{label: 'Answer', text: cardData.answer}}
          />
        </div>
      </div>
      <div className="buttons-container">
        <Button 
          text="edit"
          displayMode="normal"  
          clickHandlerCallback={handleEditClick}
        />
        <Button 
          text="delete"
          displayMode="danger"  
          clickHandlerCallback={handleDeleteClick}
        />
      </div>
    </div>
  );
}
export default CardDetailsView;