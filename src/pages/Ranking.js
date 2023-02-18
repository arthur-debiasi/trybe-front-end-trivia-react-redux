import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  state = {
    ranking: JSON.parse(localStorage.getItem('ranking')),
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>
        <div>
          {ranking.map(({ name, score }, i) => (
            <li key={ name }>
              <span data-testid={ `player-name-${i}` }>{name}</span>
              {' '}
              - Score:
              {' '}
              <span data-testid={ `player-score-${i}` }>{score}</span>
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default Ranking;
