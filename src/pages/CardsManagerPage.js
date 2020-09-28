import React from 'react';
import './CardsManagerPage.css'
//Import Component
import cardsApi from '../api/cardsApi';
import CardsList from '../components/cards-manager/CardsList';
import AddNewCard from '../components/cards-manager/AddNewCard';

class CardsManagerPage extends React.Component{

  state = {cardsListData:[]};

  async componentDidMount(){
    this.fetchCardsDataFromEndpoint();
  }

  updateCardDataInEndpoint = async (action, cardData) => {
    console.log("update endpoint");
    switch(action){
      case 'delete':
        await cardsApi.delete(`cards/${cardData.id}`);
        break;
      case 'update':
        await cardsApi.put(`cards/${cardData.id}`, cardData);
        break;
      case 'create':
        await cardsApi.post('cards', cardData);
        break;
      default:
        console.log("Error while make an http request to endpoint");
        break;
    }
    this.fetchCardsDataFromEndpoint();
  }

  fetchCardsDataFromEndpoint = async () => {
    const response = await cardsApi.get('cards');
    this.setState({ cardsListData: response.data });
  }

  render(){
    return(
      <div className="page-container">
        <AddNewCard
        updateCardDataInEndpointCallback={this.updateCardDataInEndpoint}
        />
        <CardsList 
          cardsListData={this.state.cardsListData}
          updateCardDataInEndpointCallback={this.updateCardDataInEndpoint}
        />
        
      </div>
    );
  }
}

export default CardsManagerPage;