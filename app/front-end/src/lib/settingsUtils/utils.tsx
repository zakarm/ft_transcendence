import { SettingsProps, UserInfoTypes } from '@/lib/settings-types/gameSettingsTypes';
import { toast } from 'react-toastify';
import { notificationStyle } from '@/components/ToastProvider';
import Cookies from 'js-cookie';

function checkData(dataAPI: UserInfoTypes) {
    const shouldExist: UserInfoTypes = {
        is_local : true,
        first_name: '',
        last_name: '',
        username: '',
        display_name : '',
        email: '',
        country: '',
        city: '',
        image_url: '',
        new_password: '',
        repeat_password: '',
        is_2fa_enabled: false,
        table_color: '#161625',
        ball_color: '#ffffff',
        paddle_color: '#ff4655',
        table_position: 'default',
        current_table_view: '6,8,0',
        game_difficulty: '1',
    };

    Object.keys(shouldExist).map((key) => {
        if (dataAPI[key] !== undefined && dataAPI[key] !== null) {
            if (typeof dataAPI[key] === 'string' && dataAPI[key] != 'NaN') shouldExist[key] = dataAPI[key];
            else if (typeof dataAPI[key] !== 'string') shouldExist[key] = dataAPI[key];
        }
    });

    shouldExist['current_table_view'] = shouldExist['table_position'];
    if (shouldExist['table_position'] === '1,10,0') {
        shouldExist['table_position'] = 'vertical'
    } else if (shouldExist['table_position'] === '6,8,0') {
        shouldExist['table_position'] = 'default'
    } else if (shouldExist['table_position'] === '0,10,0') {
        shouldExist['table_position'] = 'horizantal'
    }
    return shouldExist;
}

async function getInitialData({
    setOldAccountValues,
    setCurrentAccoutValues,
}: {
    setOldAccountValues: SettingsProps['setOldAccountValues'];
    setCurrentAccoutValues: SettingsProps['setCurrentAccoutValues'];
}) {
    try {
        const access = Cookies.get('access');
        const csrftoken = Cookies.get('csrftoken') || '';
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/game-settings`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${access}`, 'X-CSRFToken': csrftoken },
        });

        let data = await response.json();
        data = checkData(data);

        Cookies.set('pos_default', '6,8,0');
        Cookies.set('pos_horizantal', '0,10,0');
        Cookies.set('pos_vertical', '1,10,0');

        Cookies.set('table_color', data['table_color']);
        Cookies.set('ball_color', data['ball_color']);
        Cookies.set('paddle_color', data['paddle_color']);

        setOldAccountValues(data);
        setCurrentAccoutValues(data);
    } catch (error) {
        console.error(`Error : ${error}`);
    }
}

const validateInput: (currentAccoutValues: SettingsProps['currentAccoutValues']) => boolean = (
    currentAccoutValues: SettingsProps['currentAccoutValues'],
) => {
    const validateEmail: (email: string) => boolean = (email) => {
        const rgx: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return rgx.test(email) && email.length >= 8;
    };

    const toCheck: string[] = ['first_name', 'last_name', 'nickname'];
    let isValid: boolean = true;

    toCheck.map((key) => {
        if (currentAccoutValues[key] === '') {
            toast.error(`Invalid input : ${key}`, notificationStyle);
            isValid = false;
        }
    });

    if ("email" in currentAccoutValues &&
            !validateEmail(currentAccoutValues['email'] as string)) {
        toast.error(`Invalid input : ensure email is 8 characters long`, notificationStyle);
        isValid = false;
    }

    if ( "new_password" in currentAccoutValues &&  "repeat_password" in currentAccoutValues &&
        currentAccoutValues['new_password'] !== currentAccoutValues['repeat_password']) {
            toast.error(`Invalid input : password mismatch`, notificationStyle);
        isValid = false;
    }
    return isValid;
};


export {
    checkData,
    validateInput,
    getInitialData,
}