import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import AccountTab from '../src/components/SettingsForm/account-tab/accountTab';
import SecurityTab from '../src/components/SettingsForm/security-tab/security';
// import SettingsPage from '../src/app/settings/page';
/*
    Matchers :
        - toBe : comparing strings, boolean, number
        - toEqual : comparing objects, array...
        - toBeFalsy : check if a value is null, undefined, false, zero...
        - toBeTruthy : have a value, 1...
        - toThrow : checks if a function throws an error
        - toHaveBeenCalledWith : checks if mock function is called with correct argument
        - toHaveBeenCalled : 
    
    Async code : 
        - callback : call done function when you finish
        - promise : expect(...).resolve.[matcher], or expect(...).rejects.[matcher]
        - async / await : test('...', async () => { ... } )

    Mock Functions and spies
        - fake implementation of real function, and spies tracks the behavior of those function (is it called? args ? ....)
        - jest.fn() : creates a mock function (e.g jest.fn(x => 42 + x))
        - jest.spyOn : checks if something has been called inside a function

*/
describe('Settings Account Tab', () => {
    
    test('image and all input fields renders on the screen', () => {
        render(<AccountTab />)

        expect( screen.getByAltText(/^profile$/i) ).toBeInTheDocument();
        expect( screen.getByTestId('first_name') ).toBeInTheDocument();
        expect( screen.getByTestId('last_name') ).toBeInTheDocument();
        expect( screen.getByTestId('username') ).toBeInTheDocument();
        expect( screen.getByTestId('country') ).toBeInTheDocument();
        expect( screen.getByTestId('city') ).toBeInTheDocument();
    });

    test.todo('check comming data from GET');
    test.todo('check PUT method');
})

describe('Settings Security Tab', () => {
    
    test('image and all input fields renders on the screen', () => {
        render(<SecurityTab />);
    
        expect( screen.getByAltText(/^QR code$/i) ).toBeInTheDocument();
        expect( screen.getByTestId('new_password') ).toBeInTheDocument();
        expect( screen.getByTestId('repeat_password') ).toBeInTheDocument();
        expect( screen.getByTestId('is_2fa_enabled') ).toBeInTheDocument();
    });
    
    test.todo('check comming data from GET');
    test.todo('check PUT method');

})