import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/header/Header';

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
        path: "/test",
        element: <p>ana are mere</p>,
    },
]);

function App() {
    return (
        <div className={styles.app}>
            <Header />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
