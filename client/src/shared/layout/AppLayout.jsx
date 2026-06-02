import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import { useAuth } from '../../features/auth/hooks/useAuth';
import Button from '../ui/Button';

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold transition-colors ${
    isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-950'
  }`;

const AppLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-extrabold flex gap-1 shrink-0">
            <span className="text-blue-600">Recipe</span>
            <span className="text-red-600">Finder</span>
          </Link>

          <nav className="hidden sm:flex items-center gap-6">
            <NavLink to="/recipes" className={navLinkClass}>
              Recipes
            </NavLink>
            <NavLink to="/recipes/new" className={navLinkClass}>
              Add Recipe
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-sm text-gray-600">
              {user?.username}
            </span>
            <Button
              onClick={logout}
              variant="outline"
              className="text-sm px-4 py-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
