import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter, Routes } from "react-router-dom";
import App from '../App.js'
const fakeUser ={
    user : {
        email : '',
        password : '',
    },
    message,
    token
}
function renderWithProvider(element){
    <Routes>
        <BrowserRouter>
            {element}
        </BrowserRouter>
    </Routes>
}

describe('Test login page', ()=>{
    render(<App/>)
    
    it('Should show message', async () => {
        renderWithProvider(<App />);
        
        const btn = screen.getByTextId('login-btn');
    
        expect(btn).toBeInTheDocument();
    
        fireEvent.click(btn);

        const msg = await screen.findByTestId('login-message');
    
        expect(msg).toHaveTextContent(msg);
      });
    

      it('Should change email-input ', async () =>{
        const email = screen.getByTestId('login-email');
    
        expect(email).toBeInTheDocument();
    
        fireEvent.change(email, { target: {
          value: 'adulab@hotmail.com'
        }});
    
        expect(email).toHaveValue('adulab@hotmail.com');
    
      })
      it('Should change password-input ', async () =>{
        const password = screen.getByTestId('login-password');
    
        expect(password).toBeInTheDocument();
    
        fireEvent.change(password, { target: {
          value: 'Se@13121637'
        }});
    
        expect(password).toHaveValue('Se@13121637');
    
      })
      it('Mock api', async ()=>{
        fakeUser.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        fakeUser.user.email = "jpinformaticafoz@gmail.com"
        fakeUser.user.password = "Joel@1312"
        beforeEach(() => {
            global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({ fakeUser })
            }));
        });
    })


})