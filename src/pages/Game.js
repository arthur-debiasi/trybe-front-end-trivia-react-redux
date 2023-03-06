import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stack } from '@mui/material';
import Header from '../components/Header';
import { answerScore } from '../redux/actions';
import Trivia from '../components/Trivia';

class Game extends Component {
  state = {
    data: [],
    question: 0,
    colors: false,
    time: 30,
    correctAnswer: '',
    answers: [],
    wrongs: [],
    timedOut: false,
    btnNext: true,
    difficulty: '',
  };

  componentDidMount() {
    this.requestGame();
    this.gameTimer();
  }

  requestGame = async () => {
    const min = 3;
    const result = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${localStorage.getItem(
        'token',
      )}`,
    );
    const triviaData = await result.json();
    if (triviaData.response_code === min) {
      localStorage.setItem('token', '');
      const { history } = this.props;
      history.push('/');
    }
    this.setState({ data: triviaData.results }, () => {
      const { question, data } = this.state;
      this.setState(
        {
          correctAnswer: data[question].correct_answer,
          answers: this.shuffle([
            ...data[question].incorrect_answers,
            data[question].correct_answer,
          ]),
          difficulty: data[question].difficulty,
        },
        () => {
          const { answers, correctAnswer } = this.state;
          const wrongs = answers.filter((e) => !e.match(correctAnswer));
          this.setState({ wrongs });
        },
      );
    });
  };

  mudarCor = ({ target }) => {
    console.log('asdadadasdad1', target.innerText);
    this.setState({ colors: true, btnNext: false }, this.setScore(target.innerHTML));
    clearInterval(this.timer);
  };

  setScore = (name) => {
    const { difficulty, time, correctAnswer } = this.state;
    const { dispatchScore } = this.props;
    const TEN = 10;
    const THREE = 3;
    let diffValue;
    // console.log('------------------', target.name);
    switch (difficulty) {
    case 'easy':
      diffValue = 1;
      break;
    case 'medium':
      diffValue = 2;
      break;
    default:
      diffValue = THREE;
      break;
    }
    console.log(name, this.stacorrectAnswer);
    console.log(name === this.correctAnswer);
    if (name === correctAnswer) {
      const score = TEN + time * diffValue;
      dispatchScore(score);
      this.setState({ timedOut: true });
      clearInterval(this.timer);
    } else {
      this.setState({ timedOut: true });
      clearInterval(this.timer);
    }
  };

  gameTimer = () => {
    const SECOND = 1000;
    this.timer = setInterval(() => {
      this.setState(
        ({ time }) => ({ time: time - 1 }),
        () => {
          const { time } = this.state;
          if (time === 0) {
            this.setState({ timedOut: true, btnNext: false, colors: true });
            clearInterval(this.timer);
          }
        },
      );
    }, SECOND);
  };

  shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array; // Referência: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  };

  orderRanking = (ranking) => ranking.sort((a, b) => b.score - a.score);

  // botão next
  handleClickNext = () => {
    let { question } = this.state;
    const { history } = this.props;
    const five = 4;
    if (question === five) {
      const rankingStorage = localStorage.getItem('ranking'); // arthur: implementei a lógica de salvar o ranking do jogador no local storage
      const { score, gravatarEmail, name } = this.props;
      if (!rankingStorage) {
        localStorage.setItem(
          'ranking',
          JSON.stringify([{ name, gravatarEmail, score }]),
        );
      } else {
        const previousRanking = JSON.parse(rankingStorage);
        const updatedRanking = [
          ...previousRanking,
          { name, gravatarEmail, score },
        ];
        localStorage.setItem(
          'ranking',
          JSON.stringify(this.orderRanking(updatedRanking)),
        );
      }
      this.setState({ redirectFeed: true });
      this.setState(({ redirectFeed }) => ({ redirectFeed: !redirectFeed }));
      history.push('/feedback');
    }
    this.setState(
      (prevstate) => ({ question: prevstate.question + 1 }),
      () => {
        const { data, answers, correctAnswer } = this.state;
        ({ question } = this.state);
        const array = this.shuffle([
          ...data[question].incorrect_answers,
          data[question].correct_answer,
        ]);
        const wrongs = answers.filter((e) => !e.match(correctAnswer));
        this.setState({
          correctAnswer: data[question].correct_answer,
          answers: array,
          wrongs,
          colors: false,
          btnNext: true,
          time: 30,
          timedOut: false,
        });
      },
    );
    this.gameTimer();
  };

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
    } = this.state;

    return (
      <Stack
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        maxWidth={ 1000 }
        maxHeight={ 600 }
        height="95vh"
      >
        <Header />
        {data.length > 0 && (
          <Trivia
            data={ data }
            question={ question }
            colors={ colors }
            answers={ answers }
            correctAnswer={ correctAnswer }
            wrongs={ wrongs }
            time={ time }
            btnNext={ btnNext }
            timedOut={ timedOut }
            mudarCor={ this.mudarCor }
            handleClickNext={ this.handleClickNext }
          />
        )}
      </Stack>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (state) => dispatch(answerScore(state)),
});

function mapStateToProps(state) {
  return { ...state.player };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
