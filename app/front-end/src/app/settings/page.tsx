'use client'

import styles from './styles.module.css'
import AccountTab from './account-tab/accountTab'
import { ChangeEvent, createContext, useState } from 'react'

interface AccountTabProps {
    [formTitle : string] : string
    key : string;
}


const   FormContext = createContext<AccountTabProps>();

function SettingsPage()
{
    const   [accountValues, setValues] = useState<AccountTabProps>(
        {
            "first_name" : "Mushigarou",
            "last_name" : "HobaHoba",
            "nickname" : "siba",
            "country" : "",
            "city" : "",
            "image" : "C:/ste7/nte7",
        }
    );

    const   updateAcountInfo = (value : string, key : string) => {
        let newValues : { [formTitle : string] : string } = { ...accountValues };
        newValues[key] = value;
        const update = () => setValues(newValues);
        update()
        console.log('-------------------------->', newValues);
    }

    // updateAcountInfo("test this shit", "first_name");

    return (
        <>
        <div className={` ${styles.wrapper} container-fluid vh-100  -warning p-0 m-0`}>
            <div className="row h-100 p-0 m-0">

                <div className="row p-0 m-0 mt-5">
                    <div className="col">
                        <h1 className="valo-font">SETTINGS</h1>
                    </div>
                </div>

                <main className={`${styles.main_container} row p-0 m-0 my-5 justify-content-center align-items-center`}>
                    <form className={`row ${styles.form_container}`}>

                        <fieldset className={`row p-0 m-0 my-5`}>
                            <h2 className="col-4 mt-2 col-xl-2 valorax-font">Account</h2>
                            <h2 className="col-4 mt-2 col-xl-2 valorax-font">Security</h2>
                            <h2 className="col-4 mt-2 col-xl-2 valorax-font">Game</h2>
                        </fieldset>
                    <FormContext.Provider value={{accountValues, setValues}}>
                        <div className="row p-0 m-0">
                            <AccountTab/>
                        </div>
                    </FormContext.Provider>

                    </form>
                    <div className="col-12 d-flex justify-content-center my-4">
                        <button
                            className={`valo-font col-8 col-md-6 ${styles.create_button}`}>
                            {/* onClick={(e : ChangeEvent<HTMLInputElement>) => updateAcountInfo(e.target.innerHTML, "last_name")}> */}
                                SAVE
                        </button>
                    </div>
                </main>
                </div>

        </div>
        </>
    );
}

export default SettingsPage;
export { FormContext };