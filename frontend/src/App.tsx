import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter, createBrowserRouter, Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/header/Header';
import Statistics from './components/statistics/StatisticsPage';
import { COLOR_BACKGROUND, COLOR_ON_SURFACE, COLOR_ON_SURFACE_VARIANT, COLOR_PRIMARY } from './styling/colors';

const MapPage = React.lazy(() => import('./components/map/MapPage'));
const StatisticsPage = React.lazy(() => import('./components/statistics/StatisticsPage'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <p>Ana are mere</p>,
        errorElement: <p>error</p>
    },
    {
        path: "/map",
        element: <MapPage />,
    },
    {
        path: "/statistics",
        element: <Statistics />,
    },
]);

const theme = createTheme({
    // components: {
    //     MuiDatePicker: {
    //         styleOverrides: {
    //             root: {
    //                 color: '#ff0000',
    //                 primary: {
    //                     // light: '#ff0000',
    //                     main: '#ffffff',
    //                     // dark: '#000000'
    //                 },
    //                 backgroundColor: 'red',


    //             },
    //         },
    //     },
    // },
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
            main: COLOR_PRIMARY,
            dark: COLOR_PRIMARY,
            contrastText: COLOR_BACKGROUND
        },
        text: {
            primary: COLOR_ON_SURFACE,
            secondary: COLOR_ON_SURFACE_VARIANT,
            disabled: '#ff0077'
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <div className={styles.app}>
                    <Header />
                    <Routes>
                        <Route path="/statistics" element={<StatisticsPage />} />
                        <Route path="/map" element={<MapPage />} />
                        <Route path="*" element={<Navigate to={'/map'} />}>
                            
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
