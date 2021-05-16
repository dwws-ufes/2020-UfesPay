import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './views/landing-page';
import Home from './views/home';
import Transfer from './views/transfer';

import LanguagePicker from './components/language-picker';

import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './hooks/auth';
import { LangProvider } from './hooks/lang';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          
          <AuthProvider>
            <LangProvider>
              <LanguagePicker />
              <Route path="/" exact component={LandingPage} />

              <ProtectedRoute
                path="/home"
                hasNav={true}
                element={<Home />}/>

              <ProtectedRoute
                path="/transfer"
                hasNav={true}
                element={<Transfer />}/>
            </LangProvider>
          </AuthProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
