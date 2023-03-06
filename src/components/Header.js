import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Paper, Stack, Typography } from '@mui/material';
// import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    const hash = md5(gravatarEmail).toString();
    const imgUrl = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <header>
        <Stack
          spacing={ 8 }
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >

          <Paper
            sx={ {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              width: '1000px',
            } }
          >
            <img
              width={ 200 }
              data-testid="header-profile-picture"
              src={ imgUrl }
              alt="img gravatar"
            />
            <Stack spacing={ 10 } direction="row">
              <Typography variant="h3" data-testid="header-player-name">
                {name}
              </Typography>
              <Typography variant="h3" data-testid="header-score">
                Score:
                {' '}
                {score}
              </Typography>
            </Stack>
          </Paper>
        </Stack>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return { ...state.player };
}

export default connect(mapStateToProps)(Header);
