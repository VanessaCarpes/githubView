import { createMuiTheme } from '@material-ui/core/styles';
import { shade, lighten } from 'polished';

const themeRef = createMuiTheme({
  palette: {
    primary: {
      light: lighten(0.2, '#8950FC'),
      main: '#8950FC',
      dark: shade(0.2, '#8950FC'),
    },
    secondary: {
      light: lighten(0.2, '#D6D6E0'),
      main: '#D6D6E0',
      dark: shade(0.2, '#D6D6E0'),
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h5: {
      fontWeight: 500,
    }
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
});

const theme = {
  ...themeRef,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#ffffff',
      },
    },
    MuiButton: {
      root: {
        height: '48px',
        padding: '16px',
      },
      label: {
        textTransform: 'none',
        fontSize: '14px',
        fontWeight: 500,
        letterSpacing: 1.25,
        lineHeight: '16.8px',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

export default theme;
