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
        case '/allorder':
            content = <AllOrder />;
            break;
        case '/plasedOrder':
            content = <GetOrder/>
            break;
        default:
            content = <AllOrder />;
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
            <DashboardLayout>
                <DemoPageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
    );
}

SellerNavbar.propTypes = {
    window: PropTypes.func,
};

export default SellerNavbar;
