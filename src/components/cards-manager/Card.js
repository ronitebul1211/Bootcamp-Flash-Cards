import React from 'react';
//Import Components
import CardDetailsView from './CardDetailsView';
import CardEditView from './CardEditView';


class Card extends React.Component{

  state = {cardDisplayMode: 'details'}

  setCardDisplayMode = (cardDisplayMode) => {
    this.setState({ cardDisplayMode })
  }

  renderViewByCardMode = () => {
    switch(this.state.cardDisplayMode){
      case 'details':
        return (
          <CardDetailsView 
            cardData={this.props.cardData} 
            setCardDisplayModeCallback={this.setCardDisplayMode}
            updateCardDataInEndpointCallback={this.props.updateCardDataInEndpointCallback}
          />
        );
      case 'edit':
        return (
          <CardEditView 
            cardData={this.props.cardData} 
            setCardDisplayModeCallback={this.setCardDisplayMode}
            updateCardDataInEndpointCallback={this.props.updateCardDataInEndpointCallback}
          />
        );
      default:
        console.log('Card component renders with invalid display mode');
        break;
    }
  }

  render(){
    return (
      <div 
        className="card-container">
        {this.renderViewByCardMode()}
      </div>
    )
  }
}

export default Card;