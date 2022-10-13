import { ANSWER_SCORE, RESTART_GAME, SUBMIT_USER_PROFILE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUBMIT_USER_PROFILE:
    return { ...state, ...action.payload };
  case ANSWER_SCORE:
    return { ...state,
      score: state.score + action.payload,
      assertions: state.assertions + 1 };
  case RESTART_GAME:
    return INITIAL_STATE;
  default:
    return state;
  }
}

export default player;
