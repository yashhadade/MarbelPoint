import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import Logo from "../assets/MPlogo.png"
import AllOrder from '../Componentes/Order/AllOrder';
import PlaceOrder from '../Componentes/Order/PlaceOrder';
import GetOrder from '../Componentes/Order/GetOrder';
import SellerOrder from '../Componentes/Order/SellerOrder';
// Define theme for the demo
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
  }, [navigate])

    switch (pathname) {
        case '/allorder':
            content = <SellerOrder />;
            break;
        case '/plasedOrder':
            content = <GetOrder/>
            break;
        default:
            content = <SellerOrder />;
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


function SellerNavbar(props) {
    const { window } = props;
    const router = useDemoRouter('/home');


    const demoWindow = window !== undefined ? window() : undefined;

    return (
        <AppProvider
            navigation={[
                {
                    segment: 'allorder',
                    title: 'All order',
                    icon: <DescriptionIcon />,
                },
                {
                    segment: 'plasedOrder',
                    title: 'Plased Order',
                    icon: <DescriptionIcon />,
                }

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

SellerNavbar.propTypes = {
    window: PropTypes.func,
};

export default SellerNavbar;
