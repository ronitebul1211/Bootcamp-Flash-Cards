import React from 'react';
import './FlashCardPage.css'
//Import Component
import cardsApi from '../api/cardsApi';
import Button from '../components/utilities/Button';
import TextField from '../components/utilities/TextField';

class FlashCardPage extends React.Component{

  state = {
    cardsStack:[], 
    currentCard:{}, 
    isAnswerReval: false, 
    isGameOver: false,
    totalCardsNumber: 0, 
    solvedCards: 0
  };

  componentDidMount(){
    this.initGame();
  }

  /** Fetch cards, shuffle, and set state for initial game state */
  initGame = async() => { 
    const response = await cardsApi.get('cards');
    const cardsArray = this.shuffle(response.data);
    this.setState(
      { 
        cardsStack: cardsArray, 
        totalCardsNumber: cardsArray.length,
        isGameOver: false,
        solvedCards:0
      }, 
      this.setCurrentCard
    );
  }

  /** Shuffle array passed in and return it */
  shuffle(cardsArray) {
    let currentIndex = cardsArray.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) { //Condition: Remain elements to shuffle
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = cardsArray[currentIndex];
      cardsArray[currentIndex] = cardsArray[randomIndex];
      cardsArray[randomIndex] = temporaryValue;
    }
    return cardsArray;
  }

  /** Handle all click actions */
  onclickHandler = (action) => {
    let cardsStackUpdatedCopy = [];
      switch(action){
        case 'revalAnswer':
          this.setState({ isAnswerReval: true });
          break;
        case 'nextCard':
        case 'isGotItNo':
          cardsStackUpdatedCopy = this.getCopyOfUpdatedCardStack('popCurrentCardToEndOfStack');
          this.setState({ cardsStack: cardsStackUpdatedCopy, isAnswerReval: false }, this.setCurrentCard);
        break;
        case 'isGotItYes':
          cardsStackUpdatedCopy = this.getCopyOfUpdatedCardStack('removeCurrentCard');
          if (cardsStackUpdatedCopy.length === 0){
            this.setState({ isAnswerReval: false, isGameOver: true });
          } else {
            const solvedCards = this.state.solvedCards + 1;
            this.setState({ cardsStack: cardsStackUpdatedCopy, isAnswerReval: false, solvedCards: solvedCards }, this.setCurrentCard);
          }
        break;
        case 'newGame':
          this.initGame();
          break;
        default:
          console.log('onClickHandler execute with invalid action');
      }
  }

  /** Make copy of current cards stack, take action on current card (remove / move to stack end) and return updated copy of cards stack*/
  getCopyOfUpdatedCardStack = (action) => {
      const cardsStackCopy = [...this.state.cardsStack];
      switch(action){
        case 'removeCurrentCard':
          cardsStackCopy.shift(); 
          break;
        case 'popCurrentCardToEndOfStack':
          cardsStackCopy.push(cardsStackCopy.shift());
          break;
        default:
          console.log('getCopyOfUpdatedCardStack invoked with invalid action');
      }
      return cardsStackCopy;
  }

  /** Set current card Value */
  setCurrentCard = () => {
    this.setState({currentCard: this.state.cardsStack[0]});
  }

  /** Rendering functions  */

  renderFlashCard(){
    if( !this.state.isGameOver ) {
      return ( 
        <div className="flash-card"  >
          <div className={`flash-card-inner ${this.state.isAnswerReval && 'rotate-card'}`}>
            <div className="flash-card-front">
              <TextField  
                mode="display" 
                content={{label: 'Question', text: this.state.currentCard.question}}
              />
            </div>
            <div className="flash-card-back"> 
              <TextField  
                mode="display" 
                content={{label: 'Answer', text: this.state.currentCard.answer}}
              />
            </div>
          </div>
        </div> 
      );
    } else {
      return <div className="flash-card">GAME OVER you have completed all flash cards</div>
    }
  }

 
  renderCurrentCardAction(){
    if( !this.state.isGameOver) {
      return ( 
        <div className="btn-container">
          <Button 
            text="next card" 
            displayMode="normal" 
            clickHandlerCallback={() => {this.onclickHandler('nextCard')}}
          />
          <Button 
            text="reval answer" 
            displayMode="normal" 
            clickHandlerCallback={() => {this.onclickHandler('revalAnswer')}}
          />
      </div>
      );
    } else {
      return (
        <div>
          <Button 
            text="new game" 
            displayMode="success" 
            clickHandlerCallback={() => {this.onclickHandler('newGame')}}
          />
        </div>
      )
    }
  }

  renderYouGotItSection(){
    if(this.state.isAnswerReval){
      return(
        <div>
          <div className="title">You Got it ?</div>
          <div className="btn-container">
            <Button 
              text="yes" 
              displayMode="success" 
              clickHandlerCallback={() => {this.onclickHandler('isGotItYes')}}
            />
            <Button 
              text="no" 
              displayMode="danger" 
              clickHandlerCallback={() => {this.onclickHandler('isGotItNo')}}
            />
          </div>
      </div>
      );
    }
  }

  render(){
    return(
      <div className="page-container">
          <div className="game-container">
            {this.renderFlashCard()}  
            {this.renderCurrentCardAction()}
            {this.renderYouGotItSection()}
            {!this.state.isGameOver &&  <div className="title"> Solved Cards: {this.state.solvedCards} / {this.state.totalCardsNumber}</div>}
          </div>
      </div>
    );
  }
}

export default FlashCardPage;