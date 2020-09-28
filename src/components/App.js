
import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import CardsManagerPage from '../pages/CardsManagerPage';
import FlashCardPage from '../pages/FlashCardPage';


const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Route path="/cardsmanager" component={CardsManagerPage}/>
      <Route path="/flashcards" component={FlashCardPage}/>
    </BrowserRouter>
  );
}
export default App;