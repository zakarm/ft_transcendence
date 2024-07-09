import { createContext } from 'react';
import { SettingsProps } from '@/lib/settings-types/gameSettingsTypes';

const FormContext = createContext<SettingsProps>({
  oldAccountValues: {},
  currentAccoutValues: {},
  updateField: () => {},
  setOldAccountValues: () => {},
  setCurrentAccoutValues: () => {},
});

export type { SettingsProps as SettingsProps };
export { FormContext };
