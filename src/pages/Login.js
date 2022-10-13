import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { restartGame } from '../redux/actions';

class Login extends Component {
  componentDidMount() {
    const { dispatchRestartGame } = this.props;
    dispatchRestartGame(); // arthur: coloquei um dispatch de resetar o estado
  }

  gamePath = () => {
    const { history } = this.props;
    history.push('/game');
  };

  render() {
    return (
      <div><LoginForm gamePath={ this.gamePath } /></div>
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
});

export default connect(null, mapDispatchToProps)(Login);
