import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './views/landing-page';
import Home from './views/home';
import Transfer from './views/transfer';

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
              <Route path="/home" component={Home} />
              <Route path="/transfer" component={Transfer} />
            </Layout>
          </AuthProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
