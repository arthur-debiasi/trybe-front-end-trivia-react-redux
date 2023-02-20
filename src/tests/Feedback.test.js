import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import { RankingMock } from './helpers/localStorageMock';
import { act } from 'react-dom/test-utils';
import Feedback from '../pages/Feedback';

// const localStorageMock = (function () {
//   let store = {};

//   return {
//     getItem(key) {
//       return store[key];
//     },

//     setItem(key, value) {
//       store[key] = value;
//     },

//     clear() {
//       store = {};
//     },

//     removeItem(key) {
//       delete store[key];
//     },

//     getAll() {
//       return store;
//     },
//   };
// })();

// Object.defineProperty(window, "localStorage", { value: localStorageMock }); 
// // achei isto em https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/
// // eu ainda não consigo entender o define property, mas entendo o funcionamento do localStorageMock

describe('Testa a página Feedback', () => {
  const initialState = {
    player: {
      name: 'Carlos Marcos',
      assertions: 2,
      score: 140,
      gravatarEmail: 'carlosmarcos@email.com',
    },
  };
  test('Verifica se existem título e mensagem de feedback', () => {
    renderWithRouterAndRedux(<Feedback />, initialState, '/feedback');
    const feedbackText = screen.getByTestId('feedback-text');
    const totalScore = screen.getByTestId('feedback-total-score');
    const totalQuestion = screen.getByTestId('feedback-total-question');
    const headerPlayerName = screen.getByTestId('header-player-name');

    expect(feedbackText.innerHTML).toBe('Could be better...')
    expect(totalScore.innerHTML).toBe('140');
    expect(totalQuestion.innerHTML).toBe('2');
    expect(headerPlayerName.innerHTML).toBe('Carlos Marcos');
    });
});
