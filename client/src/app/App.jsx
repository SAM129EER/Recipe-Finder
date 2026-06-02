import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../features/auth/context/AuthContext.jsx';
import AppLayout from '../shared/layout/AppLayout';
import ProtectedRoute from '../shared/routing/ProtectedRoute';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import ForgotPassword from '../features/auth/pages/ForgotPassword';
import ResetPassword from '../features/auth/pages/ResetPassword';
import VerifyEmail from '../features/auth/pages/VerifyEmail';
import CheckEmail from '../features/auth/pages/CheckEmail';
import Home from '../features/recipes/pages/Home';
import RecipeCreate from '../features/recipes/pages/RecipeCreate';
import RecipeDetail from '../features/recipes/pages/RecipeDetail';
import RecipeEdit from '../features/recipes/pages/RecipeEdit';
import RecipeList from '../features/recipes/pages/RecipeList';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/new" element={<RecipeCreate />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/recipes/:id/edit" element={<RecipeEdit />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
