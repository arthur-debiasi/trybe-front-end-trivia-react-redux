export const SUBMIT_USER_PROFILE = 'SUBMIT_USER_PROFILE';

export const ANSWER_SCORE = 'ANSWER_SCORE';

export const RESTART_GAME = 'RESTART_GAME';

export const answerScore = (payload) => ({ type: ANSWER_SCORE, payload });

export const restartGame = () => ({ type: RESTART_GAME });
