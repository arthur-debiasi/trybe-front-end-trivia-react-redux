import { Button, ButtonGroup, FormControl, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import logo from '../trivia.png';

class LoginForm extends Component {
  render() {
    const {
      name,
      email,
      isDisabled,
      handleChange,
      changeToPlay,
      changeToSettings,
    } = this.props;

    return (
      <Stack
        direction="column"
        justifyContent="space-between"
        // alignItems="center"
        spacing={ 4 }
        // width={ 0.8 }
        // height={ 1 }
      >
        <img src={ logo } className="App-logo" alt="logo" />
        <FormControl spacing={ 2 }>
          <Stack>
            <TextField
              // sx={ { bgcolor: 'whitesmoke', color: '#403d39' } }
              margin="normal"
              required
              // autoComplete="off"
              id="outlined-required"
              label="Nome"
              type="text"
              data-testid="input-player-name"
              name="name"
              value={ name }
              onChange={ handleChange }
            />
            <TextField
              // sx={ { bgcolor: 'whitesmoke', color: '#403d39' } }
              margin="normal"
              className="logintest"
              required
              // autoComplete="off"
              // variant="filled"
              id="outlined-required"
              label="Email"
              type="email"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ handleChange }
            />
            <ButtonGroup orientation="horizontal">
              <Button
                variant="contained"
                type="button"
                data-testid="btn-play"
                disabled={ isDisabled }
                onClick={ changeToPlay }
              >
                Play
              </Button>
              <Button
                variant="contained"
                type="button"
                data-testid="btn-settings"
                onClick={ changeToSettings }
              >
                Configurações
              </Button>
            </ButtonGroup>
          </Stack>
        </FormControl>
      </Stack>
    );
  }
}

LoginForm.propTypes = {
  getToken: PropTypes.func,
  dispatch: PropTypes.func,
}.isRequired;

export default LoginForm;
