import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/header/Header';
import Statistics from './components/statistics/statistics';

const Map = React.lazy(() => import('./components/map/MapPage'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <p>Ana are mere</p>,
        errorElement: <p>error</p>
    },
    {
        path: "/map",
        element: <Map />,
    },
    {
        path: "/statistics",
        element: <Statistics />,
    },
]);

const theme = createTheme({
    components: {
        MuiDatePicker: {
            styleOverrides: {
                root: {
                    color: '#ff0000',
                    primary: {
                        // light: '#ff0000',
                        main: '#ffffff',
                        // dark: '#000000'
                    },
                    backgroundColor: 'red',


                },
            },
        },
    },
    palette: {
        // primary: {
        //     light: '#757ce8',
        //     main: '#3f50b5',
        //     dark: '#002884',
        //     contrastText: '#fff',
        //   },
        //   secondary: {
        //     light: '#ff7961',
        //     main: '#f44336',
        //     dark: '#ba000d',
        //     contrastText: '#fff',
        //   },
        primary: {
            // light: '#ff0000',
            main: '#ffffff',
            // dark: '#000000'
        },
        // secondary: {
        //     light: '#0066ff',
        //     main: '#0044ff',
        //     // dark: will be calculated from palette.secondary.main,
        //     contrastText: '#ffcc00',
        // },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>

            <div className={styles.app}>
                <Header />
                <RouterProvider router={router} />
            </div>
        </ThemeProvider>
    );
}

export default App;
