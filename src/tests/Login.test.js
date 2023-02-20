import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { tokenMock } from './helpers/localStorageMock';
import { act } from 'react-dom/test-utils';

const initialState = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

describe('Testa a página Login', () => {
afterEach(() => jest.clearAllMocks());
beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(tokenMock),
  });
})
  test('Verifica se existem dois botões play e settings', () => {
    act(() => {
      renderWithRouterAndRedux(<Login />, initialState);
    })
    const buttonPlay = screen.getByTestId('btn-play');
    const buttonSettings = screen.getByTestId('btn-settings');

    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
  });

  test('Verifica se existe um input de email', () => {
    act(() => {
      renderWithRouterAndRedux(<Login />);
    })

    const email = screen.getByTestId('input-gravatar-email');
    userEvent.type(email, 'rafa@gmail.com');

    expect(email).toBeInTheDocument();
  });

  test('Verifica se existe um input de texto', () => {
    renderWithRouterAndRedux(<Login />);

    const textInput = screen.getByTestId('input-player-name');
    userEvent.type(textInput, 'Rafael');

    expect(textInput).toBeInTheDocument();
  });

  test('Verifica o a troca de página para /game', async () => {
    act(() => {
      renderWithRouterAndRedux(<App />);
    })

    const textInput = screen.getByTestId('input-player-name');
    userEvent.type(textInput, 'Rafael');

    const email = screen.getByTestId('input-gravatar-email');
    userEvent.type(email, 'rafa@gmail.com');

    const buttonPlay = screen.getByTestId('btn-play');
    expect(buttonPlay).not.toBeDisabled();
    userEvent.click(buttonPlay);
    await waitFor(() => screen.getByRole('img', { name: /img gravatar/i }));
    // expect(history.location.pathname).toBe('/game');
  });

  test('testa o botão de settings', async () => {
    let history;
    act(() => {
      history = renderWithRouterAndRedux(<App />).history;
    })
    const btnSettings = screen.getByTestId('btn-settings');
    userEvent.click(btnSettings);
    const settingsTitle = await screen.findByTestId('settings-title');
    expect(settingsTitle).toBeInTheDocument();
  })
});
