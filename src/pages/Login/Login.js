import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Message from '../../components/Message/Message';
import fetchApi from '../../utils/fetch';
import { handleChange } from '../../utils/handleChange';
import showMessage from '../../utils/showMessage';

function Login() {
  const [loginInformation, setLoginInformation] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({ show: false, text: '', status: '' });

  const navigate = useNavigate();

  async function makeLogin() {
    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // ^ Regex extraído da seguinte fonte: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript

    function validatePassword(password) {
      if (password.length < 8 || password === password.toLowerCase()) {
        return false;
      }else {
        localStorage.setItem('user', JSON.stringify({'email': loginInformation.email, 'password': loginInformation.password}));
        localStorage.setItem('token', JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"));
        navigate('/');
      }

      return true;
    }

    const validEmail = validateEmail.test(loginInformation.email);
    const validPassword = validatePassword(loginInformation.password);

    if (!validEmail || !validPassword) {
      return showMessage(setMessage, 'Email ou senha em formato incorreto.', 'error');
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(loginInformation)
    }

  //   const { 
  //     user,
  //     message: apiMessage,
  //     token
  //   } = await fetchApi('https://odonteo-backend.herokuapp.com/login', options);
    
  //   if (apiMessage === 'Login efetuado com sucesso!') {
  //     localStorage.setItem('user', JSON.stringify(user));
  //     localStorage.setItem('token', JSON.stringify(token));
  //     navigate('/');
  //   } else {
  //     showMessage(setMessage, apiMessage, 'error');
  //   }
  }

  return (
    <main data-testid='login-test-id'>
      { message.show &&
        <Message addClass={message.status}>
          {message.text}
        </Message>
      }
      <form>
        <label htmlFor='email'>
          Email:
          <input
            className='form-input'
            id='email'
            name='email'
            type='text'
            data-testid='email-id'
            onChange={(e) => handleChange(e, setLoginInformation)}
          />
        </label>
        <label htmlFor='password'>
          Senha:
          <input
            className='form-input'
            id='password'
            name='password'
            type='password'
            data-testid='password-id'
            onChange={(e) => handleChange(e, setLoginInformation)}
          />
        </label>
        <Button
          addClassName='form-button'
          onClickFunction={makeLogin}
          testId='login-button-id'
        >
          Entrar
        </Button>
      </form>
    </main>
  );
}

export default Login;
