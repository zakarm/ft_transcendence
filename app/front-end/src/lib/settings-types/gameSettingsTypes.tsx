import { Dispatch, SetStateAction } from 'react'

interface   UserInfoTypes {
    is_local : boolean;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    country: string;
    city: string;
    image_url: string;
    new_password: string;
    repeat_password: string;
    is_2fa_enabled: boolean;
    table_color: string;
    ball_color: string;
    paddle_color: string;
    table_position: string;
    current_table_view: string;
    game_difficulty: string;
    [formLabel : string] : string | boolean
}

interface SettingsProps {
    oldAccountValues : {
        [formLabel : string] : string | boolean;
    };
    currentAccoutValues : {
        [formLabel : string] : string | boolean;
    };
    updateField : (key : string, value : string | boolean) => void;

    setOldAccountValues : Dispatch<SetStateAction<{
        [formLabel : string] : string | boolean;
    }>>;
    setCurrentAccoutValues : Dispatch<SetStateAction<{
        [formLabel : string] : string | boolean;
    }>>;
}

export type {
    SettingsProps as SettingsProps,
    UserInfoTypes as UserInfoTypes
}