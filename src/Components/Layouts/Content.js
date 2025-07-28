// TheContent.js
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from '../../Routes';

const TheContent = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map((route, idx) => (
          route.element && (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              pageTitle={route.pageTitle}
              element={<route.element />}
            />
          )
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default TheContent;