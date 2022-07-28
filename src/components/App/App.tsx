import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from '../../store/store';
import { Router } from './Router';
import {Loader} from "../Loader/Loader";

export const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <React.Suspense fallback={<Loader />}>
                    <Router />
                </React.Suspense>
            </BrowserRouter>
        </Provider>
    );
};
