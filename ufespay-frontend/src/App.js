import React, { useDebugValue } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './views/landing-page';
import Home from './views/home';
import Transfer from './views/transfer';

import ProtectedRoute from './components/ProtectedRoute';
// import PublicRoute from './components/PublicRoute';
import { AuthProvider } from './hooks/auth';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AuthProvider>
            <Route path="/" exact component={LandingPage} />
            <Layout>
              <ProtectedRoute 
                path="/home" 
                element={<Home />}/>

              <ProtectedRoute 
                path="/transfer" 
                element={<Transfer />}/>
            </Layout>
          </AuthProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
