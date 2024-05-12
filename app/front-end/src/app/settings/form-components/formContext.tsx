import { createContext } from 'react'

interface AccountTabProps {
    [formTitle : string] : string
    key : string;
}

const   FormContext = createContext<AccountTabProps>({});

export type { AccountTabProps as AccountTabProps}
export { FormContext };
