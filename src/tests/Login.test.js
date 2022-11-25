
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Routes } from 'react-router-dom';
import App from '../App.js';

const user = {email: 'luqeta@gmail.com', password: 'Joel!1312'};
const token = 'MYyOKEN354';
const message = 'Login feito com sucesso !';

describe('Test login page', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({user, message, token})
        }))
    })

    it('check email input value', async () => {
        render(<App />);
        const emailInput = screen.getByTestId('email-id');

        fireEvent.change(emailInput, { target: {
            value: 'luqeta@gmail.com'
        }});

        expect(emailInput).toHaveValue('luqeta@gmail.com');
    });

    it('check password input value', async () => {
        render(<App />);
        const passwordInput = screen.getByTestId('password-id');

        fireEvent.change(passwordInput, { target: {
            value: 'Joel@1312'
        }});

        expect(passwordInput).toHaveValue('Joel@1312');
    });
});
