//Libs
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//Components
import Container from './components/Container';
import ConditionalRoute from './components/ConditionalRoute';
//Controllers
import loginController from './controllers/LoginController';
//Pages
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import DashboardPage from './pages/DashboardPage';
import LayoutTestPage from './pages/LayoutTestPage';
import AccountPage from './pages/AccountPage';
import ForecastCategoryPage from './pages/ForecastCategoryPage';
import ForecastPage from './pages/ForecastPage';
import MovementPage from './pages/MovementPage';

class App extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        //State
        this.state = {
            loading: true,
            logged: false
        };
    }

    handleLogin = () => {
        this.setState({ logged: true });
    }

    handleLogout = () => {
        this.setState({ logged: false });
    }

    async componentDidMount() {
        this._isMounted = true;
        const logged = await loginController.isLogged();
        if (this._isMounted)
            this.setState({ loading: false, logged });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const { loading, logged } = this.state;
        if (loading) return <h1>Loading</h1>;
        return (
            <Router>
                <Container>
                    <ConditionalRoute exact path="/" component={HomePage} condition={!logged} redirect="/dashboard" />
                    <ConditionalRoute path="/login" component={LoginPage} condition={!logged} redirect="/dashboard" childProps={{ onLogin: this.handleLogin }} />
                    <ConditionalRoute path="/dashboard" component={DashboardPage} condition={logged} redirect="/login" childProps={{ onLogout: this.handleLogout }} />
                    <ConditionalRoute path="/accounts/:id" component={AccountPage} condition={logged} redirect="/login" />
                    <ConditionalRoute path="/categories/:id" component={ForecastCategoryPage} condition={logged} redirect="/login" />
                    <ConditionalRoute path="/forecasts/:id" component={ForecastPage} condition={logged} redirect="/login" />
                    <ConditionalRoute path="/movements/:id" component={MovementPage} condition={logged} redirect="/login" />
            
                    <Route path="/test" component={LayoutTestPage} />
                </Container>
            </Router>
        );
    }
}

export default App;
