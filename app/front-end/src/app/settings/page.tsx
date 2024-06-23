'use client';

import React, { ChangeEvent, useState, useEffect, useRef, MutableRefObject } from 'react';
import Cookies from 'js-cookie';
import styles from './styles.module.css';
import { toast } from 'react-toastify';
import { notificationStyle } from '@/components/ToastProvider';
import AccountTab from '@/components/SettingsForm/account-tab/accountTab';
import SecurityTab from '@/components/SettingsForm/security-tab/security';
import GameTab from '@/components/SettingsForm/GameTab/gameTab';
import NavBar from '@/components/NavBar/NavBar';
import handleImageUpload from '@/components/UploadImageBase64ToCloudinary/uploadToCloudinary';
import { FormContext } from '@/components/SettingsForm/form-components/formContext';
import { SettingsProps, UserInfoTypes } from '@/lib/settings-types/gameSettingsTypes';

function checkData(dataAPI: UserInfoTypes) {
    const shouldExist: UserInfoTypes = {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        country: '',
        city: '',
        image_url: '',
        new_password: '',
        repeat_password: '',
        is_2fa_enabled: false,
        two_fa_secret_key: '',
        table_color: '#161625',
        ball_color: '#ffffff',
        paddle_color: '#ff4655',
        table_position: 'default',
        current_table_view: '6,8,0',
        game_difficulty: '1',
    };

    Object.keys(shouldExist).map((key) => {
        if (dataAPI[key]) {
            if (typeof dataAPI[key] === 'string' && dataAPI[key] != 'NaN') shouldExist[key] = dataAPI[key];
            else if (typeof dataAPI[key] !== 'string') shouldExist[key] = dataAPI[key];
        }
    });
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

        Cookies.set('theme_table_color', '#161625');
        Cookies.set('theme_ball_color', '#ffffff');
        Cookies.set('theme_paddle_color', '#ff4655');

        Cookies.set('table_color', '#161625');
        Cookies.set('ball_color', '#ffffff');
        Cookies.set('paddle_color', '#ff4655');

        setOldAccountValues(data);
        setCurrentAccoutValues(data);
    } catch (error) {
        console.error('Unexpected error : ', error);
    }
}

const validateInput: (oldAccountValues: SettingsProps['oldAccountValues']) => boolean = (
    oldAccountValues: SettingsProps['oldAccountValues'],
) => {
    const validateEmail: (email: string) => boolean = (email) => {
        // const rgx: RegExp = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;
        const rgx: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return rgx.test(email);
    };

    const toCheck: string[] = ['first_name', 'last_name', 'nickname'];
    let isValid: boolean = true;

    toCheck.map((key) => {
        if (oldAccountValues[key] === '') {
            toast.error(`Invalid input : ${key}`, notificationStyle);
            isValid = false;
        }
    });

    if (!validateEmail(oldAccountValues['email'] as string)) {
        toast.error(`Invalid input : email`, notificationStyle);
        isValid = false;
    }

    if (oldAccountValues['new_password'] !== oldAccountValues['repeat_password']) {
        toast.error(`Invalid input : new_password or repeat_password`, notificationStyle);
        isValid = false;
    }
    return isValid;
};

/* Submits the form */
const postFormData = async ({
    oldAccountValues,
    isFormChanged,
}: {
    oldAccountValues: SettingsProps['oldAccountValues'];
    isFormChanged: MutableRefObject<boolean>;
}) => {
    if (isFormChanged.current && validateInput(oldAccountValues)) {
        const changeImageURL = async () => {
            if (typeof oldAccountValues['image_url'] === 'string') {
                const promise = await handleImageUpload(oldAccountValues['image_url']);
                if (promise !== null && typeof promise === 'string') {
                    oldAccountValues['image_url'] = promise;
                }
            }
        };

        const postData = async () => {
            await changeImageURL();
            console.log('------> JSON To Post', JSON.stringify(oldAccountValues));
            isFormChanged.current = false;
            const access = Cookies.get('access');
            const csrftoken = Cookies.get('csrftoken') || '';
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/game-settings`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${access}`,
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify(oldAccountValues),
            });

            if (res.ok) {
                toast.success('To be saved...', notificationStyle);
                /* New Chosen Colors */
                Cookies.set('table_color', oldAccountValues['table_color'] as string);
                Cookies.set('ball_color', oldAccountValues['ball_color'] as string);
                Cookies.set('paddle_color', oldAccountValues['paddle_color'] as string);

            } else {
                toast.error('Error : cannot update profile', notificationStyle);
            }
        };

        try {
            postData();
        } catch (error) {
            console.error('Unexpected error : ', error);
        }
    }
};

function SettingsPage() {
    const [oldAccountValues, setOldAccountValues] = useState<SettingsProps['oldAccountValues']>({});
    const [currentAccoutValues, setCurrentAccoutValues] = useState<SettingsProps['currentAccoutValues']>({});
    const [tab, setTab] = useState<string>('Account');
    const isFormChanged = useRef<boolean>(false);
    /* Updates a specific field of the input */
    const updateField = (key: string, value: string | boolean) => {
        setCurrentAccoutValues((prevValues: SettingsProps['currentAccoutValues']) => {
            const newValues = { ...prevValues };
            newValues[key] = value;
            return newValues;
        });
    };
    const options = ['Account', 'Security', 'Game'];

    /* Compares values in  [currentAccoutValues, oldAccountValues] */
    const checkDifferences = () => {
        const compareDictValues = (d1: SettingsProps['currentAccoutValues'], d2: SettingsProps['oldAccountValues']) => {
            let count: number = 0;
            for (const key in d1) {
                if (d1[key] !== d2[key]) {
                    break;
                }
                count++;
            }

            return !(Object.entries(d1).length === count);
        };

        const updatePostValues = (values: SettingsProps['currentAccoutValues']) => {
            const newValues: SettingsProps['currentAccoutValues'] = { ...values };
            for (const [key, value] of Object.entries(values)) {
                newValues[key] = value;
            }
            if (compareDictValues(currentAccoutValues, oldAccountValues)) {
                setOldAccountValues(newValues);
                isFormChanged.current = true;
            }
        };

        updatePostValues(currentAccoutValues);
    };

    /*  Gets Initial Values From Backend */
    useEffect(() => {
        getInitialData({ setOldAccountValues, setCurrentAccoutValues });
    }, []);

    /*  Updates PostValues */
    useEffect(() => {
        checkDifferences();
    }, [currentAccoutValues]);

    return (
        <div className={`${styles.wrapper} container-fluid vh-100 p-0 m-0`}>
            <div className="row h-100 p-0 m-0">
                <section className="row p-0 m-0 mt-5">
                    <div className="col">
                        <h1 className="valo-font">SETTINGS</h1>
                    </div>
                </section>

                <main className={`${styles.main_container} row p-0 m-0 h-75 justify-content-center align-items-start`}>
                    <form className={`row ${styles.form_container} p-1 m-0 justify-content-between align-items-center`}>
                        <fieldset className={`${styles.tab_container} row p-0 m-0`}>
                            <div className="col m-2 p-2 d-flex flex-row flex-nowrap">
                                <NavBar options={options} setChoosenTab={setTab} />
                            </div>
                        </fieldset>
                        <FormContext.Provider
                            value={{
                                currentAccoutValues,
                                oldAccountValues,
                                updateField,
                                setOldAccountValues,
                                setCurrentAccoutValues,
                            }}>
                            <div
                                className={`${styles.content_container} row  p-0 m-0  justify-content-center align-items-center`}>
                                {(tab === 'Account' && <AccountTab />) ||
                                    (tab === 'Security' && <SecurityTab />) ||
                                    (tab === 'Game' && <GameTab />)}
                            </div>
                        </FormContext.Provider>
                    </form>
                    <div className="col-12 d-flex justify-content-center my-4">
                        <button
                            className={`valo-font col-8 col-md-6 ${styles.create_button}`}
                            onClick={() => {
                                postFormData({ oldAccountValues, isFormChanged });
                            }}>
                            SAVE
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default SettingsPage;
