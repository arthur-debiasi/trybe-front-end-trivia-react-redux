import React from 'react';
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { tokenMock } from './helpers/localStorageMock';
import userEvent from '@testing-library/user-event';
import gameAPIMock, { badResponseAPI } from './helpers/gameAPIMock';
import { act } from 'react-dom/test-utils';
import App from '../App';

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

Object.defineProperty(window, 'localStorage', { value: localStorageMock }); // achei isto em https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/

const initialState = {
  player: {
    name: 'Carlos Marcos',
    assertions: 0,
    score: 0,
    gravatarEmail: 'carlosmarcos@email.com',
  },
};

describe('Testa a página Game', () => {
  beforeEach(() => jest.resetAllMocks())
  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  })

  test('testa uma resposta errada da API', async () => {
    localStorageMock.setItem('token', tokenMock);

    const { history } = renderWithRouterAndRedux(<App />, initialState, '/');

    userEvent.type(screen.getByTestId('input-player-name'), 'Rafael');
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'rafa@gmail.com');

    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).not.toBeDisabled();

    userEvent.click(buttonPlay);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    })
  });

  test('testa uma partida de 5 rodadas', async () => {
    jest.spyOn(global, 'clearInterval');
    jest.spyOn(global, 'setInterval');
    
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(gameAPIMock),
  }));
    const { history, store } = renderWithRouterAndRedux(<App />, initialState, '/game');
    
    await waitFor(() => expect(history.location.pathname).toBe('/game'))

    const questionText = await screen.findByTestId('question-text', undefined, {timeout: 2000});
    const questionCategory = screen.getByTestId('question-category');
    const headerPlayerName = screen.getByTestId('header-player-name');
    const headerScore = screen.getByTestId('header-score');
    const correctAnswer = screen.getByTestId('correct-answer');

    expect(questionText).toBeInTheDocument();
    expect(questionCategory).toBeInTheDocument();
    expect(headerPlayerName).toBeInTheDocument();
    expect(headerScore.innerHTML).toBe('0');

    userEvent.click(correctAnswer);

    const correctGreen = screen.getByTestId('correct-answer');
    const wrongRed = screen.getByTestId('wrong-answer-0');
    expect(correctGreen.classList.contains('correct-answer'));
    expect(wrongRed.classList.contains('wrong-answer'));

    expect(screen.getByTestId('header-score').innerHTML).toBe('100')
    
    const btnNext = screen.getByTestId('btn-next');
    userEvent.click(btnNext);

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));

    expect(screen.getByTestId('header-score').innerHTML).toBe('200')

    userEvent.click(screen.getAllByTestId('wrong-answer--1')[0]);
    userEvent.click(screen.getByTestId('btn-next'));

    expect(screen.getByTestId('header-score').innerHTML).toBe('200')

    userEvent.click(screen.getAllByTestId('wrong-answer--1')[0]);
    userEvent.click(screen.getByTestId('btn-next'));

    expect(screen.getByTestId('header-score').innerHTML).toBe('200');
    
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));
    
    expect(screen.getByTestId('header-score').innerHTML).toBe('300')
    expect(localStorageMock.getItem('ranking')).toBe('[{\"name\":\"Carlos Marcos\",\"gravatarEmail\":\"carlosmarcos@email.com\",\"score\":300}]');
    
    expect(history.location.pathname).toBe('/feedback');
    
    expect(setInterval).toHaveBeenCalled();
    expect(clearInterval).toHaveBeenCalled();

    jest.clearAllTimers();
  });


  test('Testa timeout do timer', async () => {
    localStorageMock.setItem('token', tokenMock);
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(gameAPIMock),
  }));

    const { history } = renderWithRouterAndRedux(<App />, initialState, '/');
        
    act(() => history.push('/game'));
    await waitFor(() => expect(history.location.pathname).toBe('/game'))
    
    const correctAnswer = await screen.findByTestId('correct-answer');
    const wrong0 = screen.getByTestId('wrong-answer-0');
    const wrong1 = screen.getByTestId('wrong-answer-1');
    const wrong2 = screen.getByTestId('wrong-answer-2');
    
    jest.useFakeTimers();
    jest.advanceTimersByTime(34000);

    const timer = await screen.findByText(/30/i);
    expect(timer).toBeInTheDocument;
    
    expect(correctAnswer).toBeDisabled;
    expect(wrong0).toBeDisabled;
    expect(wrong1).toBeDisabled;
    expect(wrong2).toBeDisabled;
    
    jest.clearAllTimers();

  });

  
});
