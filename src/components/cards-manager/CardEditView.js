import React from 'react';
//Import Components
import CardFormContent from '../utilities/CardFormContent';
import Button from '../utilities/Button';

class CardEditView extends React.Component {

  state = {questionValue: '', answerValue: ''};

  componentDidMount(){
    this.setState({
      questionValue: this.props.cardData.question, 
      answerValue: this.props.cardData.answer
    });
  }

   onInputChange= (event) => {
    const stateKey = `${event.target.name}Value`;
    const updatedValue = event.target.value;
    this.setState({
      [stateKey]: updatedValue}
    );
  }

   //Invoke function on Card parent to set Details display mode
  handleBackClick = () => {
    this.props.setCardDisplayModeCallback('details')
  }

  //Invoke function on CardManager update record from endpoint
  handleSaveClick = () => {
    const updatedCardData = {
      id: this.props.cardData.id,
      question: this.state.questionValue,
      answer: this.state.answerValue,
    }
    this.props.updateCardDataInEndpointCallback('update', updatedCardData);
    this.props.setCardDisplayModeCallback('details')
  }

  render(){
    const {answerValue, questionValue} = this.state;
    return (
      <div className="card-view-container">
        <CardFormContent 
          questionValue={questionValue}
          answerValue={answerValue}
          onInputChangeCallback={this.onInputChange}
        />
        <div className="buttons-container">
          <Button 
            text="save" 
            displayMode="success" 
            clickHandlerCallback={this.handleSaveClick}
          />
          <Button 
            text="back" 
            displayMode="danger" 
            clickHandlerCallback={this.handleBackClick} 
          />
        </div>
      </div>
    );
  }
}

export default CardEditView;