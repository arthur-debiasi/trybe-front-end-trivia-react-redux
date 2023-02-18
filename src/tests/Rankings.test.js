import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import { RankingMock } from './helpers/localStorageMock';

const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock }); 
// achei isto em https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/
// eu ainda não consigo entender o define property, mas entendo o funcionamento do localStorageMock

describe('Testa a página Login', () => {
  test('Verifica se existem título e botão', () => {
    localStorageMock.setItem('ranking', RankingMock);
    renderWithRouterAndRedux(<Ranking />);
    const title = screen.getByRole('heading', { name: /ranking/i });
    const homeBtn = screen.getByRole('button', { name: /home/i });
    expect(title).toBeInTheDocument();
    expect(homeBtn).toBeInTheDocument();
  });
});
