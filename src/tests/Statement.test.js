import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App.js';

describe('Tests statement page', () => {

    it('check inputs in statement', async () => {
        render(<App />);
        const passwordInput = screen.getByTestId('password-id');
        const emailInput = screen.getByTestId('email-id');
        const loginButton = screen.getByTestId('login-button-id');
    
        fireEvent.change(passwordInput, { target: {
            value: 'Joel@1312'
        }});
     
        fireEvent.change(emailInput, { target: {
            value: 'fidelisGf@hotmail.com'
        }});
    
        expect(emailInput).toHaveValue('fidelisGf@hotmail.com');
        expect(passwordInput).toHaveValue('Joel@1312');
    
        fireEvent.click(loginButton);
    
        const mainPage = screen.getByTestId('main-test-id');
    
        expect(mainPage).toBeInTheDocument();

        const statementButton = screen.getByTestId('statement-button-id');

        fireEvent.click(statementButton);

        const statementPage = screen.getByTestId('statement-test-id');
       

        expect(statementPage).toBeInTheDocument();

        const initialDataInput = screen.getByTestId('initial-date-id');
        const endDataInput = screen.getByTestId('end-date-id');
    
        fireEvent.change(initialDataInput, { target: {
            value: '2002-10-08' 
        }});
        fireEvent.change(endDataInput, { target: {
            value: '2022-08-08' 
        }});

        expect(initialDataInput).toHaveValue('2002-10-08' );
        expect(endDataInput).toHaveValue('2022-08-08' );
    });
});