import { createTheme } from '@mui/material';

const fontUbuntu = 'Ubuntu Mono';
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3E8914',
    },
    background: {

      default: '#1A140F',
      paper: '#212121',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'question' },
          style: {
            border: '2px solid grey',
          },
        },
      ],
      styleOverrides: {
        root: ({ ownerState }) => {
          switch (ownerState.variant) {
          case 'contained':
            return {
              '&.Mui-disabled': {
                // background: 'green',
                border: '2px solid #3E8914',
                // color: 'black',
              },
            };
          case 'outlined':
            return {
              '&.Mui-disabled': {
                // background: 'red',
                // color: 'black',
                border: '2px solid #E4572E',
              },
            };
          default:
          }
        },
      },
    },
  },

  typography: {
    fontFamily: fontUbuntu,
    h1: {
      fontFamily: fontUbuntu,
    },
    h2: {
      fontFamily: fontUbuntu,
    },
    h3: {
      fontFamily: fontUbuntu,
    },
    h4: {
      fontFamily: fontUbuntu,
    },
    h6: {
      fontFamily: fontUbuntu,
    },
    h5: {
      fontFamily: fontUbuntu,
    },
    subtitle1: {
      fontFamily: fontUbuntu,
    },
    subtitle2: {
      fontFamily: fontUbuntu,
    },
    button: {
      fontFamily: fontUbuntu,
      fontWeight: 900,
    },
    overline: {
      fontFamily: fontUbuntu,
    },
  },
});

export default theme;
