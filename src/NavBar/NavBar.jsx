import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import DescriptionIcon from "@mui/icons-material/Description";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout, ThemeSwitcher } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import Product from "../Componentes/Product/Product";
import SignUp from "../Auth/SignUp";
import Supplier from "../Componentes/Supplier/Supplier";
import Logo from "../assets/MPlogo.png";
import AllOrder from "../Componentes/Order/AllOrder";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


function LogoutAction() {
  console.log("logout rendered");
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect to home or login page
    console.log("Logged out, navigating to home...");
    navigate("/"); // Redirect to home page after logout (you can change this to '/login')
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      width="100%"
      >
      <Button
        variant="contained"
      
        color="primary"
        sx={{ marginLeft: "20px" ,marginRight:"20px"}}
        onClick={handleLogout}
      >
        Log Out
      </Button>
      <ThemeSwitcher />
    </Box>
  );
}
// Define theme for the demo
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
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
    case "/supplier":
      content = <Supplier />;
      break;
    case "/product":
      content = <Product />;
      break;
    case "/allorder":
      content = <AllOrder />;
      break;
    case "/signUp":
      content = <SignUp />;
      break;
    default:
      content = <Supplier />;
  }

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
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
  const router = useDemoRouter("/home");

  const demoWindow = window !== undefined ? window() : undefined;

  // Function to handle logout

  return (
    <AppProvider
      navigation={[
        {
          segment: "supplier",
          title: "Supplier",
          icon: <DescriptionIcon />,
        },
        {
          segment: "product",
          title: "Product",
          icon: <DescriptionIcon />,
        },
        {
          segment: "allorder",
          title: "All order",
          icon: <DescriptionIcon />,
        },
        {
          segment: "signUp",
          title: "Sign Up",
          icon: <DescriptionIcon />,
        },
      ]}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src={Logo} alt="Marbel Point Logo" style={{ width: '40px', height: 'auto' }} />,
        title: 'Marble point',
        homeUrl: '/toolpad/core/introduction',
      }}
    >
      <DashboardLayout
        slots={{
          toolbarActions: LogoutAction,
        }}
      >
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;