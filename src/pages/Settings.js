import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import construction from '../under-construction.jpg';

export default class Settings extends Component {
  render() {
    return (
      <Stack direction="column" alignItems="center">
        <Typography variant="h2" data-testid="settings-title">Configurações</Typography>
        <Link to="/">
          <Button type="button" data-testid="btn-go-home">
            <Typography variant="h5">Home</Typography>
          </Button>
        </Link>
        <img width="50%" src={ construction } alt="construction-meme" />
      </Stack>
    );
  }
}
