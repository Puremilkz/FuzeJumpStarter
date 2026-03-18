import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './components/common';
import { Header, Footer, Tabs } from './components/common';
import { SetupWizard } from './components/setup';
import { JumpstartTab } from './components/jumpstart';
import { DebriefTab } from './components/debrief';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('jumpstart');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <SetupWizard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1">
        {activeTab === 'jumpstart' ? <JumpstartTab /> : <DebriefTab />}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
