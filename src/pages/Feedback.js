import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Typography, Stack } from '@mui/material';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const three = 3;
    return (
      <Stack spacing={ 8 }>
        <Header />
        <Card>
          <Typography variant="h2">Feedback</Typography>
          <Typography
            variant="h4"
            data-testid="feedback-text"
            sx={ { color: assertions < three ? '#DA2C38' : '#3E8914' } }
          >
            {assertions < three ? 'Could be better...' : 'Well Done!'}
          </Typography>
          <br />
          <Stack direction="row" justifyContent="center" spacing={ 15 }>
            <Stack>
              <Typography variant="h5">Score</Typography>
              <Typography variant="h3" data-testid="feedback-total-score">
                {score}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h5">Correct assertions</Typography>
              <Typography variant="h3" data-testid="feedback-total-question">
                {assertions}
              </Typography>
            </Stack>
          </Stack>
          <Link to="/">
            <Button type="button" data-testid="btn-play-again">
              <Typography variant="h5">Play Again</Typography>
            </Button>
          </Link>
          <Link to="/ranking">
            <Button type="button" data-testid="btn-ranking">
              <Typography variant="h5">Ranking</Typography>
            </Button>
          </Link>
        </Card>
      </Stack>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

function mapStateToProps(state) {
  return { ...state.player };
}

export default connect(mapStateToProps)(Feedback);
