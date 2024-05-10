'use client'

import styles from './styles.module.css'
import AccountTab from './account-tab/accountTab'
import { ChangeEvent, createContext, useState, useEffect, useRef, useLayoutEffect } from 'react'
import Cookies from 'js-cookie'

interface AccountTabProps {
    [formTitle : string] : string
    key : string;
}

const   FormContext = createContext<AccountTabProps>();

async function    getInitialData({setValuesToPost, setAccountValues}) {
    
    try {
        const   access = Cookies.get('access');
        const   response = await fetch('', {
            method : "GET",
            headers :{ Authorization : `Bearer ${access}` },
        })
        
        // const data = await response.json();
        setValuesToPost(
            {
                "first_name" : "Mushigarou",
                "last_name" : "HobaHoba",
                "nickname" : "saba",
                "country" : "Morocco",
                "city" : "Khouribga",
                "image" : "C:/ste7/nte7",
            }
        )
        setAccountValues(
            {
                "first_name" : "Mushigarou",
                "last_name" : "HobaHoba",
                "nickname" : "saba",
                "country" : "Morocco",
                "city" : "Khouribga",
                "image" : "C:/ste7/nte7",
            }
        )
    } catch(error) {
        console.error("Unexpected error : ", error);
    }
}

    /* Submits the form */
const   postFormData = async ({valuesToPost, isChanged}) => {
    try {

        if (isChanged.current) {
            isChanged.current = false;
            const   access = Cookies.get('access');
            
            console.log('------> JSON To Post', JSON.stringify(valuesToPost));
            const   res = await fetch('', {
            method : "POST",
            headers : {
                "content-type" : "application/json",
                "Authorization" : `Beaver ${access}`
            },
            body : JSON.stringify(valuesToPost)
        })

        if (res.ok) {
            /* .... updates form placeholders */
        }
    }
    } catch (error) {
        console.error("Unexpected error : ", error);
    }
}

function    SettingsPage()
{
    const   [valuesToPost, setValuesToPost] =  useState<AccountTabProps>({})
    const   [accountValues, setAccountValues] = useState<AccountTabProps>({});
    const   isChanged : boolean = useRef<boolean>(false);
    /* Updates a specific field of the input */
    const   updateField = (key : string, value : string) => {
        const   newValues = { ...accountValues };
        newValues[key] = value;
        setAccountValues(newValues);
    }
    /* Compares values in  [accountValues, valuesToPost] */    
    const   checkDifferences = () => {
        const   compareDictValues = (d1: { [key: string]: string }, d2 : { [key: string]: string }) => {
            let count : number = 0;
            for (const key in d1) {
                if (d1[key] !== d2[key]){
                    break ;
                }
                count++;
            }

            // console.log(Object.entries(d1).length, count, ! (Object.entries(d1).length === count))
            return ( ! (Object.entries(d1).length === count) )
        }

        const updatePostValues = (values: { [key: string]: string }) => {

            let newValues: { [key: string]: string } = { ...values };
            for (const [key, value] of Object.entries(values)) {
                newValues[key] = value;
            }
            if (compareDictValues(accountValues, valuesToPost)) {
                setValuesToPost(newValues);
                isChanged.current = true;
            }
        }

        updatePostValues(accountValues)
    }
    
    /*  Gets Initial Values From Backend */
    useLayoutEffect(() => {
        getInitialData({setValuesToPost, setAccountValues});
    }, []);

    /*  Updates PostValues */
    useEffect(() => {
        checkDifferences();
    }, [accountValues])

    return (
        <div className={` ${styles.wrapper} container-fluid vh-100  -warning p-0 m-0`}>
            <div className="row h-100 p-0 m-0">

                <section className="row p-0 m-0 mt-5">
                    <div className="col">
                        <h1 className="valo-font">SETTINGS</h1>
                    </div>
                </section>

                <main className={`${styles.main_container} row p-0 m-0 my-5 justify-content-center align-items-center`}>
                    <form className={`row ${styles.form_container}`}>

                        <fieldset className={`row p-0 m-0 my-5`}>
                            <h2 className="col-4 mt-2 col-xl-2 itim-font">Account</h2>
                            <h2 className="col-4 mt-2 col-xl-2 itim-font">Security</h2>
                            <h2 className="col-4 mt-2 col-xl-2 itim-font">Game</h2>
                        </fieldset>
                    <FormContext.Provider value={{accountValues, valuesToPost, updateField}}>
                        <div className="row p-0 m-0">
                            <AccountTab/>
                        </div>
                    </FormContext.Provider>

                    </form>
                    <div className="col-12 d-flex justify-content-center my-4">
                        <button
                            className={`valo-font col-8 col-md-6 ${styles.create_button}`}
                            onClick={(e : ChangeEvent<HTMLInputElement>) =>{ postFormData({valuesToPost, isChanged}) } }>
                                SAVE
                        </button>
                    </div>
                </main>
                </div>

        </div>
    );
}

export default SettingsPage;
export { FormContext };