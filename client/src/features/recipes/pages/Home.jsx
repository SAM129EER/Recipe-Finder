import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../auth/hooks/useAuth';
import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col justify-between">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold flex gap-1">
            <span className="text-blue-600">Recipe</span>
            <span className="text-red-600">Finder</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium hidden sm:inline">
                Welcome, <strong className="text-blue-600">{user.username}</strong>
              </span>
              <Button
                onClick={logout}
                variant="outline"
                className="text-sm px-4 py-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline" className="text-sm px-4 py-2">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" className="text-sm px-4 py-2">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16 flex-grow flex items-center justify-center w-full">
        {user ? (
          <div className="w-full max-w-2xl">
            <Card className="text-center border-gray-200">
              <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                Hey, {user.username}!
              </h2>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                You are successfully logged in using your account (<span className="text-blue-600 font-semibold">{user.email}</span>).
              </p>

              <div className="pt-6 border-t border-gray-100 mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" className="w-full sm:w-auto px-8 py-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New Recipe
                </Button>
                <Button variant="secondary" className="w-full sm:w-auto px-8 py-3">
                  Browse Recipes
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                Culinary Assistant
              </div>
              <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-none text-gray-950">
                Discover & Create <br />
                <span className="text-blue-600">Delicious Recipes</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Your personal digital kitchen journal. Search recipes, customize ingredients, save your favorites, and plan your weekly meals effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/register" className="w-full sm:w-auto">
                  <Button variant="primary" className="px-8 py-4 text-base font-semibold w-full">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button variant="outline" className="px-8 py-4 text-base font-semibold w-full">
                    Browse Popular Recipes
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-10 border-t border-gray-100 max-w-lg">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-600 font-bold">OK</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Easy Storage</h4>
                    <p className="text-xs text-gray-500">Save cooking secrets</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">OK</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Ingredient Search</h4>
                    <p className="text-xs text-gray-500">Find recipes based on pantry</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <Card className="w-full max-w-sm border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Start</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Sign up or log in to unlock personalized meal suggestions, custom dish uploading, and more.
                </p>
                <div className="space-y-3">
                  <Link to="/register" className="block">
                    <Button variant="primary" className="w-full py-3">
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login" className="block">
                    <Button variant="secondary" className="w-full py-3">
                      Log In
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 bg-gray-50">
        <p>&copy; {new Date().getFullYear()} Recipe Finder App. Secure Authentication enabled.</p>
      </footer>
    </div>
  );
};

export default Home;
