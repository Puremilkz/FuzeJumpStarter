import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [companyCode, setCompanyCode] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [sheetUrl, setSheetUrl] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('fuze_auth');
    if (stored) {
      try {
        const auth = JSON.parse(stored);
        setCompanyCode(auth.companyCode);
        setCompanyName(auth.companyName);
        setSheetUrl(auth.sheetUrl);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('fuze_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (code, sheet, name = null) => {
    setCompanyCode(code);
    setCompanyName(name);
    setSheetUrl(sheet);
    setIsAuthenticated(true);
    localStorage.setItem('fuze_auth', JSON.stringify({
      companyCode: code,
      companyName: name,
      sheetUrl: sheet,
    }));
  }, []);

  const logout = useCallback(() => {
    setCompanyCode(null);
    setCompanyName(null);
    setSheetUrl(null);
    setIsAuthenticated(false);
    localStorage.removeItem('fuze_auth');
  }, []);

  return (
    <AuthContext.Provider value={{
      companyCode,
      companyName,
      sheetUrl,
      isAuthenticated,
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
