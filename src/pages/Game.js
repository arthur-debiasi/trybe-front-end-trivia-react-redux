import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { answerScore } from '../redux/actions';

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
    const token = localStorage.getItem('token');
    const min = 3;
    const result = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const triviaData = await result.json();
    if (triviaData.response_code === min) {
      localStorage.setItem('token', '');
      const { history } = this.props;
      history.push('/');
    }
    this.setState({ data: triviaData.results }, () => {
      const { question, data } = this.state;
      this.setState({
        correctAnswer: data[question].correct_answer,
        answers: this.shuffle([
          ...data[question].incorrect_answers, data[question].correct_answer]),
        difficulty: data[question].difficulty,
      }, () => {
        const { answers, correctAnswer } = this.state;
        const wrongs = answers
          .filter((e) => !e.match(correctAnswer));
        this.setState({ wrongs });
      });
    });
  };

  mudarCor = ({ target }) => {
    this.setState({ colors: true, btnNext: false }, this.setScore(target));
    clearInterval(this.timer);
  };

  setScore = (target) => {
    const { difficulty, time } = this.state;
    const { dispatchScore } = this.props;
    const TEN = 10;
    const THREE = 3;
    let diffValue;
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
    if (target.name === 'correct') {
      const score = TEN + (time * diffValue);
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
      this.setState(({ time }) => ({ time: time - 1 }), () => {
        const { time } = this.state;
        if (time === 0) {
          this.setState({ timedOut: true, btnNext: false, colors: true });
          clearInterval(this.timer);
        }
      });
    }, SECOND);
  };

  shuffle = (array) => {
    let currentIndex = array.length; let
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
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
      const newRanking = JSON.stringify([{ name, gravatarEmail, score }]);
      if (!rankingStorage) {
        localStorage.setItem('ranking', newRanking);
      } else {
        const previousRanking = JSON.parse(rankingStorage);
        const updatedRanking = [...previousRanking, { name, gravatarEmail, score }];
        console.log(this.orderRanking(updatedRanking));
        localStorage.setItem(
          'ranking',
          JSON.stringify(this.orderRanking(updatedRanking)),
        );
      }
      history.push('/feedback');
    }
    this.setState((prevstate) => ({ question: prevstate.question + 1,

    }), () => {
      const { data, answers, correctAnswer } = this.state;
      ({ question } = this.state);
      const array = this.shuffle([
        ...data[question].incorrect_answers, data[question].correct_answer]);
      const wrongs = answers
        .filter((e) => !e.match(correctAnswer));
      this.setState({
        correctAnswer: data[question].correct_answer,
        answers: array,
        wrongs,
        colors: false,
        btnNext: true,
        time: 30,
        timedOut: false,
      });
    });
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
      timedOut } = this.state;
    return (
      <div>
        <Header />
        {
          data.length > 0 && (
            <div>
              <h2 data-testid="question-category">{data[question].category}</h2>
              <h1 data-testid="question-text">{data[question].question}</h1>
              <div data-testid="answer-options">
                {
                  answers.map((e) => (
                    <button
                      key={ e }
                      data-testid={
                        e.match(correctAnswer)
                          ? 'correct-answer' : `wrong-answer-${wrongs.indexOf(e)}`
                      }
                      className={ colors
                        ? (`${e.match(correctAnswer)
                          ? 'correct' : 'wrong'}-answer`) : '' }
                      type="button"
                      disabled={ timedOut }
                      onClick={ this.mudarCor }
                      name={ e.match(correctAnswer) ? 'correct' : 'wrong' }
                    >
                      {e}
                    </button>
                  ))
                }
              </div>
              <p>{time}</p>
              { !btnNext && (
                <button
                  type="button"
                  data-testid="btn-next"
                  // hidden={ btnNext }
                  onClick={ this.handleClickNext }
                >
                  Next
                </button>
              )}
            </div>)
        }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (state) => dispatch(answerScore(state)),
});

function mapStateToProps(state) {
  return { ...state.player };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
