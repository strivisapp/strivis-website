import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { base44 } from "@/lib/base44Client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      setIsAuthenticated(true);
      return currentUser;
    } catch {
      setUser(null);
      setIsAuthenticated(false);
      return null;
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = useCallback(
    async (email, password) => {
      const { user: loggedInUser } = await base44.auth.loginViaEmailPassword(email, password);
      setUser(loggedInUser);
      setIsAuthenticated(true);
      return loggedInUser;
    },
    []
  );

  const logout = useCallback((redirectUrl) => {
    base44.auth.logout(redirectUrl);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoadingAuth, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
