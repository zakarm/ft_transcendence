import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import AccountTab from '../src/components/SettingsForm/account-tab/accountTab';
import SecurityTab from '../src/components/SettingsForm/security-tab/security';
// import SettingsPage from '../src/app/settings/page';

test('profile image renders', () => {
    render(<AccountTab />)

    const   img = screen.getByAltText(/^profile$/i);

    expect(img).toBeInTheDocument();
});

test('Rendering security tab : image, and input fields', () => {
    render(<SecurityTab />);

    expect( screen.getByAltText(/^QR code$/i) ).toBeInTheDocument();
    expect( screen.getByTestId('new_password') ).toBeInTheDocument();
    expect( screen.getByTestId('repeat_password') ).toBeInTheDocument();
    expect( screen.getByTestId('is_2fa_enabled') ).toBeInTheDocument();
});