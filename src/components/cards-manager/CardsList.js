import React from 'react';
//Import Components
import Card from './Card';


const CardsList = (props) => {

  const {cardsListData, updateCardDataInEndpointCallback} = props
  
  const renderedList = cardsListData.map(card => {
    return (
      <Card 
        key={card.id} 
        cardData={card}
        updateCardDataInEndpointCallback={updateCardDataInEndpointCallback}
      />
    )
  });
  
  return (
    <div className="cards-list-container">
      {renderedList}
    </div>
  );
}
export default CardsList;