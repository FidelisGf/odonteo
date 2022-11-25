import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import isAuthenticated from '../../utils/auth';
import fetchApi from '../../utils/fetch';
import { handleChange } from '../../utils/handleChange';
import './Statement.css';

function Statement() {
  const [datesOfStatement, setDatesOfStatement] = useState({});
  const [renderStatement, setRenderStatement] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const navigate = useNavigate();
  const [incomeDetails, setIncomeDetails] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }

    async function getIncome() {
      const options = {
        method: 'GET'
      }
  
      const { income } = await fetchApi(
        `https://odonteo-backend.herokuapp.com/income/${user.id}`,
        options,
        true
      );
  
      setIncomeDetails(income);
    }

    getIncome();
  }, [user, navigate]);

  function checkIncome() {
    const { beginningDate, endingDate } = datesOfStatement;
    setTotalIncome(0);

    incomeDetails.forEach(({ dates, installmentValue }) => {
      const datesInInterval = JSON.parse(dates)
        .filter((date) => {
          return Date.parse(date) >= Date.parse(beginningDate)
            && Date.parse(date) <= Date.parse(endingDate)
        });

      setTotalIncome((oldState) => {
        return oldState + (datesInInterval.length * JSON.parse(installmentValue));
      });
    });

    setRenderStatement(true);
  }

  return (
    <main data-testid='statement-test-id'>
      <form>
        <label htmlFor='beginning-date'>
          Data de início:
          <input
            className='form-input date'
            id='beginning-date'
            data-testid='initial-date-id'
            name='beginningDate'
            type='date'
            onChange={(e) => handleChange(e, setDatesOfStatement)}
          />
        </label>
        <label htmlFor='ending-date'>
          Data de fim:
          <input
            className='form-input date'
            id='ending-date'
            data-testid='end-date-id'
            name='endingDate'
            type='date'
            onChange={(e) => handleChange(e, setDatesOfStatement)}
          />
        </label>
        <Button
          addClassName='form-button'
          onClickFunction={checkIncome}
        >
          Consultar faturamento
        </Button>
      </form>
      {renderStatement &&
        <div className='statement'>
          <button
            className='close-button'
            onClick={() => setRenderStatement(false)}
          >
            x
          </button>
          <table>
            <thead>
              <tr>
                <th>total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(totalIncome)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>}
      <Button
        id='go-back-button'
        onClickFunction={() => navigate('/')}
      >
        Voltar
      </Button>
    </main>
  );
}

export default Statement;
