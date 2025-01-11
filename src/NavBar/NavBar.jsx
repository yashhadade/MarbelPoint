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
import Logo from "../assets/MPlogo.png"
import AllOrder from '../Componentes/Order/AllOrder';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, navigating to home..."); 
      navigate("/"); 
    }
  }, [navigate]);

  switch (pathname) {
    case '/supplier':
      content = <Supplier />;
      break;
    case '/product':
      content = <Product />;
      break;
    case '/allorder':
      content = <AllOrder />;
      break;
    case '/signUp':
      content = <SignUp />;
      break;
    default:
      content = <Supplier />;
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
  const navigate = useNavigate();  // Use the navigate hook outside of AppProvider

  const demoWindow = window !== undefined ? window() : undefined;

  // Function to handle logout
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to home or login page
    console.log("Logged out, navigating to home...");
    navigate("/");  // Redirect to home page after logout (you can change this to '/login')
  };

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
          segment: 'allorder',
          title: 'All order',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'signUp',
          title: 'Sign Up',
          icon: <DescriptionIcon />,
        },
        // {
        //   segment: "logOut",
        //   title: "LOGOUT",
        //   icon: <DescriptionIcon />,
        //   onClick: handleLogout,
        // }
      ]}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src={Logo} alt="Marbel Point Logo" style={{ width: '40px', height: 'auto' }} />,
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
