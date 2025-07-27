import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './Layout';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route
          path="/*"
          element={
            false ? <Layout /> : <Navigate to="/auth/login" replace />
          }
        ></Route> */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};
