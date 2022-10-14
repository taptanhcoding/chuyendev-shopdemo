import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { publicRoutes, priviteRoutes } from '~/routes/routes';
import CustomLayout from './layouts/CustomLayout/CustomLayout';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/customer" element={<CustomLayout />}>
                        {priviteRoutes.map((route, index) => {
                            const Page = route.element;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Route>
                    <Route path="/" element={<DefaultLayout />}>
                        {publicRoutes.map((route, index) => {
                            const Page = route.element;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
