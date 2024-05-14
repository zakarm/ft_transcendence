import { MutableRefObject, createContext, SetStateAction, Dispatch } from 'react'

interface SettingsProps {
    valuesToPost : {
        [formLabel : string] : string | boolean
    };
    accountValues : {
        [formLabel : string] : string | boolean
    };
    updateField : (key : string, value : string | boolean) => void;
    setValuesToPost : Dispatch<SetStateAction<{ [formLabel: string]: string | boolean }>>;
    setAccountValues : Dispatch<SetStateAction<{ [formLabel: string]: string | boolean }>>;
}

const   FormContext = createContext<SettingsProps>({
    valuesToPost : {},
    accountValues : {},
    updateField : () => {},
    setValuesToPost : () => {},
    setAccountValues : () => {}
});

export type { SettingsProps as SettingsProps}
export { FormContext };
