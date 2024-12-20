import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import Product from '../Componentes/Product/Product';
import SignUp from '../Auth/SignUp';
import Supplier from '../Componentes/Supplier/Supplier';

// Define theme for the demo
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


function DemoPageContent({ pathname }) {
  let content;

  
  switch (pathname) {
    case '/supplier':
      content = <Supplier/>;
      break;
    case '/product':
      content = <Product/>;
      break;
    case '/signUp':
      content=<SignUp/>;
      break;
    default:
      content = <Supplier/>;
  }

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {content}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};


function Navbar(props) {
  const { window } = props;
  const router = useDemoRouter('/home'); 

  
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={[
        {
          segment: 'supplier',
          title: 'Supplier',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'product',
          title: 'Product',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'signUp',
          title: 'Sign Up',
          icon: <DescriptionIcon />,
        },
      ]}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: null,
        title: 'Marbel point',
        homeUrl: '/toolpad/core/introduction',
      }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
