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
    isGame: false,
  };

  componentDidMount() {
    const { dispatchRestartGame } = this.props;
    dispatchRestartGame(); // arthur: coloquei um dispatch de resetar o estado
  }

  pegarToken = async () => {
    const token = await requestToken();
    localStorage.setItem('token', token);
  };

  changeToSettings = () => {
    this.setState({ isSettings: true });
  };

  changeToPlay = async () => {
    const { email, name } = this.state;
    const { dispatchSubmitProfile } = this.props;
    await this.pegarToken();
    this.setState({ isGame: true });
    dispatchSubmitProfile({ name, gravatarEmail: email });
  };

  validateLogin = () => {
    const { name, email } = this.state;
    this.setState({ isDisabled: !(name.length > 0 && email.length > 0) });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.validateLogin);
  };

  render() {
    const { name, email, isDisabled, isGame, isSettings } = this.state;
    if (isSettings) {
      return <Settings />;
    }
    if (isGame) {
      const { history } = this.props;
      history.push('/game');
    }
    return (
      <div>
        <LoginForm
          name={ name }
          email={ email }
          isDisabled={ isDisabled }
          isGame={ isGame }
          isSettings={ isSettings }
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
