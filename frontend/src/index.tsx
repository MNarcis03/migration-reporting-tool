import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Map = React.lazy(() => import('./components/map/MapPage'));


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
