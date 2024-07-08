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
import { SettingsProps } from '@/lib/settings-types/gameSettingsTypes';
import {
    validateInput,
    getInitialData,
} from '@/lib/settingsUtils/utils'

interface   PostFormDataTypes {
    valuesToPost: SettingsProps['currentAccoutValues'];
    isFormChanged: MutableRefObject<boolean>;
    setOldAccountValues : SettingsProps['setCurrentAccoutValues']
    currentAccoutValues : SettingsProps['currentAccoutValues']
}
/* Submits the form */
const postFormData = async ({
    valuesToPost,
    isFormChanged,
    setOldAccountValues,
    currentAccoutValues
}: PostFormDataTypes) => {
        const changeImageURL = async () => {
            if (typeof valuesToPost['image_url'] === 'string') {
                const promise = await handleImageUpload(valuesToPost['image_url']);
                if (promise !== null && typeof promise === 'string') {
                    valuesToPost['image_url'] = promise;
                }
            }
        };

        const postData = async () => {
            if ("image_url" in valuesToPost) {
                await changeImageURL();
            }
            isFormChanged.current = false;
            const access = Cookies.get('access');
            const csrftoken = Cookies.get('csrftoken') || '';
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/game-settings`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${access}`,
                        'X-CSRFToken': csrftoken,
                    },
                    body: JSON.stringify(valuesToPost),
                });
                const   data = await res.json();
                if (res.ok) {
                    Object.entries(data).map(([key, value]) => {
                        toast.success(`${key} ${value}`, notificationStyle);
                    })
                    setOldAccountValues(currentAccoutValues);
                    if ("table_color" in valuesToPost) { Cookies.set('table_color', valuesToPost['table_color'] as string); }
                    if ("ball_color" in valuesToPost) { Cookies.set('ball_color', valuesToPost['ball_color'] as string); }
                    if ("paddle_color" in valuesToPost) { Cookies.set('paddle_color', valuesToPost['paddle_color'] as string); }
    
                } else {
                    Object.entries(data).map(([key, value]) => {
                        toast.error(`${key} : ${value}`, notificationStyle);
                    })
                }
            } catch (error) {
                toast.error('Cannot save your changes')
            }
        };

        postData();
};

function SettingsPage() {
    const [valuesToPost, setValuesToPost] = useState<SettingsProps['oldAccountValues']>({});
    const [oldAccountValues, setOldAccountValues] = useState<SettingsProps['oldAccountValues']>({});
    const [currentAccoutValues, setCurrentAccoutValues] = useState<SettingsProps['currentAccoutValues']>({});
    const [tab, setTab] = useState<string>('Account');
    const isFormChanged = useRef<boolean>(false);
    const options = ['Account'];
    if (currentAccoutValues.is_local) { options.push('Security') }
    options.push('Game');
    
    /* Updates a specific field of the input */
    const updateField = (key: string, value: string | boolean) => {
        setCurrentAccoutValues((prevValues: SettingsProps['currentAccoutValues']) => {
            const newValues = { ...prevValues };
            newValues[key] = value;
            return newValues;
        });
    };

    /* Compares values in  [currentAccoutValues, oldAccountValues] */
    const checkDifferences = () => {
        const compareDictValues = (d1: SettingsProps['currentAccoutValues'], d2: SettingsProps['oldAccountValues']) => {
            let tmp : SettingsProps['currentAccoutValues'] = {};
            let isValuesChanged : boolean = false;
            for (const key in d1) {
                if (d1[key] !== d2[key]) {
                    if (typeof d1[key] === 'string' && d1[key] === '' && key !== 'city') {
                        updateField(key, oldAccountValues[key]);
                        continue ;
                    }
                    tmp[key] = d1[key];
                    isValuesChanged = true
                }
            }
            setValuesToPost(tmp);
            tmp = {}
            return isValuesChanged;
        };

        const updatePostValues = (values: SettingsProps['currentAccoutValues']) => {
            const newValues: SettingsProps['currentAccoutValues'] = { ...values };
            for (const [key, value] of Object.entries(values)) {
                newValues[key] = value;
            }
            if (compareDictValues(currentAccoutValues, oldAccountValues)) {
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
                                if (isFormChanged.current && validateInput(currentAccoutValues)
                                        && Object.entries(valuesToPost).length > 0) {
                                    postFormData({ valuesToPost, isFormChanged, setOldAccountValues, currentAccoutValues });
                                }
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
