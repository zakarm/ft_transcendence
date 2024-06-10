import { createContext} from 'react'
import { SettingsProps } from '@/lib/settings-types/gameSettingsTypes';

const   FormContext = createContext<SettingsProps>({
    valuesToPost : {},
    accountValues : {},
    updateField : () => {},
    setValuesToPost : () => {},
    setAccountValues : () => {}
});

export type { SettingsProps as SettingsProps}
export { FormContext };
