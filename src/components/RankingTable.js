import PropTypes from 'prop-types';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { Component } from 'react';

class RankingTable extends Component {
  render() {
    const { ranking } = this.props;
    return (
      <TableContainer component={ Paper }>
        <Table sx={ { minWidth: 650 } } aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Pos.</TableCell>
              <TableCell>Player</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ranking.map((e, i) => (
              <TableRow key={ e.name }>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

RankingTable.propTypes = {
  ranking: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

export default RankingTable;
