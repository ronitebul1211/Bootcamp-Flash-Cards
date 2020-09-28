import React from 'react';
//Import Components
import CardFormContent from '../utilities/CardFormContent';
import Button from '../utilities/Button';

class AddNewCard extends React.Component{

  state = {questionValue: '', answerValue: ''};

  //Invoke function on CardManager to create record from endpoint
  handleAddClick = () => {
    const cardData = {
      question: this.state.questionValue,
      answer: this.state.answerValue
    }
    this.props.updateCardDataInEndpointCallback('create', cardData);
    this.setState({ questionValue: '', answerValue:'' });
  }

  onInputChange = (event) => {
    const stateKey = `${event.target.name}Value`;
    const updatedValue = event.target.value;
    this.setState({ [stateKey]: updatedValue });
  }

  render(){
    return (
      <div className="add-card-container">
        <span className="title">Add New Card</span>
        <CardFormContent 
          questionValue={this.state.questionValue}
          answerValue={this.state.answerValue}
          onInputChangeCallback={this.onInputChange}
        />
        <div className="btn-container">
          <Button 
            text="add" 
            displayMode="success" 
            clickHandlerCallback={this.handleAddClick}
          />
        </div> 
      </div>
    );
  }

}

export default AddNewCard;