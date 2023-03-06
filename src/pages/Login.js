import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { restartGame, submitProfile } from '../redux/actions';
import requestToken from '../api';
import Settings from './Settings';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
    isSettings: false,
  };

  async componentDidMount() {
    const { dispatchRestartGame } = this.props;
    dispatchRestartGame(); // arthur: coloquei um dispatch de resetar o estado
    await this.pegarToken();
  }

  pegarToken = async () => {
    const token = await requestToken();
    localStorage.setItem('token', token);
  };

  changeToSettings = () => {
    this.setState({ isSettings: true });
  };

  changeToPlay = () => {
    const { email, name } = this.state;
    const { dispatchSubmitProfile, history } = this.props;
    dispatchSubmitProfile({ name, gravatarEmail: email });
    history.push('/game');
  };

  validateLogin = () => {
    const { name, email } = this.state;
    const regexp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    this.setState({
      isDisabled: !(name.length > 2 && email.length > 0 && email.match(regexp)),
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateLogin);
  };

  render() {
    const { name, email, isDisabled, isSettings } = this.state;
    if (isSettings) {
      return <Settings />;
    }
    return (
      <div>
        <LoginForm
          name={ name }
          email={ email }
          isDisabled={ isDisabled }
          handleChange={ this.handleChange }
          changeToPlay={ this.changeToPlay }
          changeToSettings={ this.changeToSettings }
        />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchRestartGame: () => dispatch(restartGame()),
  dispatchSubmitProfile: (payload) => dispatch(submitProfile(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
