import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/button';
import Card from '../components/card';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden flex flex-col justify-between">
      {/* Decorative background glow elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navbar Header */}
      <header className="border-b border-slate-900/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Recipe Finder
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-slate-300 font-medium hidden sm:inline">
                  Welcome, <strong className="text-amber-500">{user.username}</strong>
                </span>
                <Button onClick={logout} variant="outline" className="text-sm px-4 py-2">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="outline" className="text-sm px-4 py-2 border-slate-800 text-slate-300 hover:text-white">
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
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-16 flex-grow flex items-center justify-center relative z-10 w-full">
        {user ? (
          // Logged In Dashboard Dashboard Screen
          <div className="w-full max-w-2xl">
            <Card className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/10">
                <svg className="w-10 h-10 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-100 mb-2">
                Hey, {user.username}!
              </h2>
              <p className="text-slate-400 max-w-md mx-auto mb-6">
                You are successfully logged in using your account (<span className="text-slate-300 font-semibold">{user.email}</span>).
              </p>
              
              <div className="pt-6 border-t border-slate-800/80 mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
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
          // Hero Landing Screen
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold uppercase tracking-wider">
                🍳 Culinary Assistant
              </div>
              <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-none text-slate-100">
                Discover & Create <br />
                <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                  Delicious Recipes
                </span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                Your personal digital kitchen journal. Search recipes, customize ingredients, save your favorites, and plan your weekly meals effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/register">
                  <Button variant="primary" className="px-8 py-4 text-base font-semibold w-full sm:w-auto">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="px-8 py-4 text-base font-semibold w-full sm:w-auto">
                    Browse Popular Recipes
                  </Button>
                </Link>
              </div>
              
              {/* Features list */}
              <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-900/60 max-w-lg">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500 font-bold">✓</div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Easy Storage</h4>
                    <p className="text-xs text-slate-400">Save cooking secrets</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500 font-bold">✓</div>
                  <div>
                    <h4 className="font-semibold text-slate-200">Ingredient Search</h4>
                    <p className="text-xs text-slate-400">Find recipes based on pantry</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex justify-center">
              <Card className="w-full max-w-sm relative">
                {/* Decorative glow inside card */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/20 rounded-full blur-[40px] pointer-events-none"></div>
                
                <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                  <span>🚀</span> Quick Start
                </h3>
                <p className="text-sm text-slate-400 mb-6">
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

      {/* Footer */}
      <footer className="border-t border-slate-900/80 py-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Recipe Finder App. Built with React, Tailwind & Express.</p>
      </footer>
    </div>
  );
};

export default Home;
