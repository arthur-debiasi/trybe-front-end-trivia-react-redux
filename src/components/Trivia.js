import {
  Button,
  ButtonGroup,
  Card,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import replacer from '../utils/replacer';

export default class Trivia extends Component {
  render() {
    const {
      data,
      question,
      colors,
      answers,
      correctAnswer,
      wrongs,
      time,
      btnNext,
      timedOut,
      mudarCor,
      handleClickNext,
    } = this.props;
    return (
      <Stack spacing={ 3 } width={ 1000 }>

        <Card variant="outlined">
          <Stack spacing={ 2 } alignItems="center">
            <Stack spacing={ 3 }>
              <Typography variant="h5" color="red" data-testid="question-category">
                {data[question].category}
              </Typography>
              <Typography variant="h4" data-testid="question-text">
                {replacer(data[question].question)}
              </Typography>
            </Stack>
            <ButtonGroup data-testid="answer-options">
              {answers.map((e) => (
                <Button
                  key={ e }
                  variant={ `${
                    colors
                      ? `${e === (correctAnswer) ? 'contained' : 'outlined'}`
                      : 'question'
                  }` }
                  data-testid={
                    e === (correctAnswer)
                      ? 'correct-answer'
                      : `wrong-answer-${wrongs.indexOf(e)}`
                  }
                  type="text"
                  disabled={ timedOut }
                  onClick={ mudarCor }
                  name={ e === (correctAnswer) }
                >
                  <Typography variant="h5">{replacer(e)}</Typography>
                </Button>
              ))}
            </ButtonGroup>

            <Typography variant="h5">
              {time}
              {' '}
              seconds left!
            </Typography>

            <Button
              variant="text"
              type="button"
              data-testid="btn-next"
              onClick={ handleClickNext }
              disabled={ btnNext }
            >
              <Typography variant="h5">Next</Typography>
            </Button>
          </Stack>
        </Card>
      </Stack>
    );
  }
}

Trivia.propTypes = {
  answers: PropTypes.shape({
    map: PropTypes.func,
  }),
  btnNext: PropTypes.any,
  colors: PropTypes.any,
  correctAnswer: PropTypes.any,
  data: PropTypes.any,
  handleClickNext: PropTypes.any,
  mudarCor: PropTypes.any,
  question: PropTypes.any,
  time: PropTypes.any,
  timedOut: PropTypes.any,
  wrongs: PropTypes.shape({
    indexOf: PropTypes.func,
  }),
}.isRequired;
