import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { resendVerificationApi } from '../api/authApi';
import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';

const CheckEmail = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  const [resendMessage, setResendMessage] = useState('');
  const [resendError, setResendError] = useState('');
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    if (!email) {
      setResendError('No email address found. Please register again.');
      return;
    }

    setResendMessage('');
    setResendError('');
    setIsResending(true);

    try {
      const response = await resendVerificationApi(email);
      setResendMessage(response.data.message);
    } catch (err) {
      setResendError(err.response?.data?.message || 'Failed to resend. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Brand Logo/Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl font-extrabold tracking-tight flex gap-1 justify-center mb-2">
            <span className="text-blue-600">Recipe</span>
            <span className="text-red-600">Finder</span>
          </Link>
        </div>

        <Card className="border-gray-200">
          <div className="text-center py-4">
            {/* Email Icon */}
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h3>
            <p className="text-gray-500 text-sm mb-2">
              We've sent a verification link to:
            </p>
            {email && (
              <p className="text-blue-600 font-semibold text-sm mb-4">{email}</p>
            )}
            <p className="text-gray-400 text-xs mb-6">
              Click the link in the email to verify your account. The link expires in 24 hours.
            </p>

            {resendError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm text-left flex items-start gap-2">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{resendError}</span>
              </div>
            )}

            {resendMessage && (
              <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm text-left flex items-start gap-2">
                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{resendMessage}</span>
              </div>
            )}

            <Button
              onClick={handleResend}
              variant="outline"
              className="w-full py-2.5 mb-3"
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Resending...</span>
                </>
              ) : (
                'Resend Verification Email'
              )}
            </Button>

            <div className="mt-4 text-sm text-gray-600">
              Already verified?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-500 font-semibold transition-colors duration-200">
                Go to Login
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CheckEmail;
