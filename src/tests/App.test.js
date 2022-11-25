import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App.js';

describe('Test routes', () => {
    beforeEach(() => {
        const currentState = window.history.state;

        window.history.replaceState(currentState, '', '/');
    });

    it('render login page', async () => {
        window.history.pushState({}, 'Login page', '/login')

        render(<App/>)

        const loginPage = screen.getByTestId('login-test-id');

        expect(loginPage).toBeInTheDocument();
    });

    it('should render main page', async () => {
        render(<App />);
        const passwordInput = screen.getByTestId('password-id');
        const emailInput = screen.getByTestId('email-id');

        const loginButton = screen.getByTestId('login-button-id');

        fireEvent.change(passwordInput, { target: {
            value: 'Password1!23'
        }});
     
        fireEvent.change(emailInput, { target: {
            value: 'userFake@gmail.com'
        }});

        expect(emailInput).toHaveValue('JoelP@gmail.com');
        expect(passwordInput).toHaveValue('Joel!23');

        fireEvent.click(loginButton);

        const mainPage = screen.getByTestId('main-test-id');

        expect(mainPage).toBeInTheDocument();
    });

    it('render statement page', async () => {
        window.history.pushState({}, 'Login page', '/login')
        render(<App />);
        const passwordInput = screen.getByTestId('password-id');
        const emailInput = screen.getByTestId('email-id');

        const loginButton = screen.getByTestId('login-button-id');

        fireEvent.change(passwordInput, { target: {
            value: 'Joel!23'
        }});
     
        fireEvent.change(emailInput, { target: {
            value: 'JoelP@gmail.com'
        }});

        expect(emailInput).toHaveValue('JoelP@gmail.com');
        expect(passwordInput).toHaveValue('Joel!23');

        fireEvent.click(loginButton);

        const statementButton = screen.getByTestId('statement-button-id');

        fireEvent.click(statementButton);

        const statementPage = screen.getByTestId('statement-test-id');
       

        expect(statementPage).toBeInTheDocument();
    });
});