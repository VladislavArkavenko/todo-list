import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from "../../common/routes";

const TodoList = React.lazy(() => import('../../pages/TodoList/TodoList'));
const PageNotFound = React.lazy(() => import('../../pages/PageNotFound/PageNotFound'));

export const Router = () => (
    <Routes>
        <Route path={ROUTES.HOME} element={<TodoList />}/>
        <Route path={ROUTES.NOT_FOUND} element={<PageNotFound/>}/>
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace/>}/>
    </Routes>
);
