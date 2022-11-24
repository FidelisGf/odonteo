import {render, screen} from "@testing-library/react"
import App from '../App.js'

describe('Test routes', () => {
    it('test Login', async ()=>{
        const currenState = window.history.state 
        window.history.replaceState(currenState, '', '/')
    });
    it('render login', async ()=>{
        window.history.pushState({}, 'Login ', '/login')
        render(<App></App>)
        const loginPg = screen.getByTestId('login-dtTest')
        expect(loginPg).toBeInTheDocument()
    })
    it('Should Render statment pg', async ()=>{
        window.history.pushState({}, 'statment page', '/statement')
        render(<App></App>)
        const statmentPg = screen.getByTestId('login-dtTest')
        expect(statmentPg).toBeInTheDocument('statment-test')
    })

})