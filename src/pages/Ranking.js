import {
  Button,
  Card,
  Typography,
} from '@mui/material';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RankingTable from '../components/RankingTable';

class Ranking extends Component {
  state = {
    ranking: JSON.parse(localStorage.getItem('ranking')),
  };

  render() {
    const { ranking } = this.state;
    return (
      <Card>
        <Typography variant="h2" data-testid="ranking-title">
          Ranking
        </Typography>
        <Link to="/">
          <Button type="button" data-testid="btn-go-home">
            <Typography variant="h5">Home</Typography>
          </Button>
        </Link>
        <RankingTable ranking={ ranking } />
      </Card>
    );
  }
}

export default Ranking;
