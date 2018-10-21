import * as React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import App from './App';
import Thesaurus from './components/Thesaurus';
//import { Header } from './components/Header';
import SecondComponent from './components/SecondComponent';
import './styles/main.css';

export const AppRouter: React.StatelessComponent<{}> = () => (
    <BrowserRouter>
        <div>
            
            <main>
                <Route exact={true} path="/" component={App} />
                <Route path="/Thesaurus" component={Thesaurus} />
                <Route path="/SecondComponent" component={SecondComponent} />
                <Redirect from="*" to="/" />
            </main>
        </div>
    </BrowserRouter>
);
