import { createTheme, ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter, createBrowserRouter, Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/header/Header';
import MapPage from './components/map/MapPage';
import StatisticsPage from './components/statistics/StatisticsPage';
import Statistics from './components/statistics/StatisticsPage';
import { COLOR_BACKGROUND, COLOR_ON_SURFACE, COLOR_ON_SURFACE_VARIANT, COLOR_PRIMARY, COLOR_SURFACE } from './styling/colors';

// const MapPage = React.lazy(() => import('./components/map/MapPage'));
// const StatisticsPage = React.lazy(() => import('./components/statistics/StatisticsPage'));

const theme = createTheme({
    components: {
        MuiDatePicker: {
            styleOverrides: {
                root: {
                    backgroundColor: 'red',
                },
            },
        },
    },
    palette: {
        primary: {
            light: '#ff0000',
            main: COLOR_PRIMARY,
            dark: COLOR_PRIMARY,
            contrastText: COLOR_BACKGROUND
        },
        text: {
            primary: COLOR_ON_SURFACE,
            secondary: COLOR_ON_SURFACE_VARIANT,
            disabled: '#ff0077'
        },
        common: {
            white: '#ff0000',
            black: '#00ff00'
        },
        background: {
            paper: COLOR_SURFACE
        },
        action: {
            active: COLOR_PRIMARY,
        }
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
                        <Route path="*" element={<Navigate to={'/map'} />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
