
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null; // You can create a specific type for profile
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthContext: Initializing...");
    const getSession = async () => {
      console.log("AuthContext: Attempting to get session...");
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        console.log("AuthContext: Session found, fetching profile...");
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (profileError) {
          console.error("AuthContext: Error fetching profile:", profileError);
        }
        setProfile(profileData);
      } else {
        console.log("AuthContext: No session found initially.");
      }
      setLoading(false);
      console.log("AuthContext: Initial loading set to false. Session:", session);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("AuthContext: Auth state changed. Event:", _event, "Session:", session);
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          console.log("AuthContext: Auth state changed, session user found. Fetching profile...");
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          if (profileError) {
            console.error("AuthContext: Error fetching profile on auth state change:", profileError);
          }
          setProfile(profileData);
        } else {
          console.log("AuthContext: Auth state changed, no session user.");
          setProfile(null);
        }
        setLoading(false);
        console.log("AuthContext: Loading set to false after auth state change. Session:", session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    profile,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
