import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Clean up the URL by removing the hash and any query parameters
        if (window.location.hash) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }

        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (data.session) {
          // Successfully authenticated, redirect to home
          navigate('/', { replace: true });
        } else {
          // No session found, redirect to login
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Auth error:', error);
        navigate('/login');
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Completing authentication...</h2>
        <p>Please wait while we log you in.</p>
      </div>
    </div>
  );
}
