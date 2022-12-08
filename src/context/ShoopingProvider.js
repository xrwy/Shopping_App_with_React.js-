import React, { useState } from 'react'
import { useContext } from 'react';
import { createContext } from 'react'
import { ADD_TO_CART, DELETE_FROM_CARD, INCREASE_NUMBER_OF_PIECES, DESCREASE_NUMBER_OF_PIECES } from '../action_types/ActionTypes';

const ShoopingContext = createContext();


const addToCart = (state,payload) => {
  if(state.cardContents.length === 0) {
    const newPayload = {...payload, product_count:1};

    localStorage.setItem('cart_contents', JSON.stringify([newPayload]));

    return {
      ...state,
      cardContents:JSON.parse(localStorage.getItem('cart_contents')),
    }
  }else  {
    const control = state.cardContents.find((card) => card.id === payload.id);

    if(control){
      return {
        ...state,
        cardContents:JSON.parse(localStorage.getItem('cart_contents')),
      }
      
    }else {
      const newPayload = {...payload, product_count:1};
      const cardContents_ = [...JSON.parse(localStorage.getItem('cart_contents')), newPayload];
      localStorage.setItem('cart_contents', JSON.stringify(cardContents_));

      return {
        ...state,
        cardContents:JSON.parse(localStorage.getItem('cart_contents')),
      }
    }
  }
}

const deleteFromCard = (state, payload) => {
  const filteredCardContents = state.cardContents.filter((card) => card.id !== payload);
  localStorage.setItem('cart_contents', JSON.stringify(filteredCardContents));

  return {
    ...state,
    cardContents:JSON.parse(localStorage.getItem('cart_contents')),
  }
}

const increaseNumberOfPieces = (state, payload) => {
  const findValue = state.cardContents.find((findItem) => findItem.id === payload.id)
  const indexOfValue = state.cardContents.indexOf(findValue);
  const newValue = {...findValue, product_count:findValue.product_count + 1};
  state.cardContents.splice(indexOfValue,1,newValue);
  localStorage.setItem('cart_contents', JSON.stringify(state.cardContents));

  return {
    ...state,
    cardContents:JSON.parse(localStorage.getItem('cart_contents')),
  }
}

const descreaseNumberOfPieces = (state, payload) => {
  const findValue = state.cardContents.find((findItem) => findItem.id === payload.id)
  const indexOfValue = state.cardContents.indexOf(findValue);

  if(findValue.product_count <= 1){
    return {
      ...state,
    }
  }
 else {
    const newValue = {...findValue, product_count:findValue.product_count - 1};
    state.cardContents.splice(indexOfValue,1,newValue);
    localStorage.setItem('cart_contents', JSON.stringify(state.cardContents));

    return {
      ...state,
      cardContents:JSON.parse(localStorage.getItem('cart_contents')),
    } 
 }
}


const ShoopingProvider = ({ children }) => {
  const [state, setState] = useState({
    cardContents:JSON.parse(localStorage.getItem('cart_contents')) || [],
    dispatch:(action) => {
      switch(action.type) {
        case ADD_TO_CART:
          setState((state) => addToCart(state, action.payload));
          break;
        case DELETE_FROM_CARD:
          setState((state) => deleteFromCard(state, action.payload));
          break;
        case INCREASE_NUMBER_OF_PIECES:
          setState((state) => increaseNumberOfPieces(state, action.payload));
          break;
        case DESCREASE_NUMBER_OF_PIECES:
          setState((state) => descreaseNumberOfPieces(state, action.payload));
          break;
        default:
          setState((state) => state);
          break;
      }
    },
  })

  return (
    <ShoopingContext.Provider value={state}>
        { children }
    </ShoopingContext.Provider>
  )
}

export const useShoopingContext = () => useContext(ShoopingContext);


export default ShoopingProvider
