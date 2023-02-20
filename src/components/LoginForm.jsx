import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
      <div>
        <form>
          <input
            type="text"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ handleChange }
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ () => changeToPlay() }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => changeToSettings() }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  getToken: PropTypes.func,
  dispatch: PropTypes.func,
}.isRequired;

export default LoginForm;
