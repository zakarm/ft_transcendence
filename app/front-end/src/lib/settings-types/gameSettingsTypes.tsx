import { Dispatch, SetStateAction } from 'react'

interface   UserInfoTypes {
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
    two_fa_secret_key: string;
    table_color: string;
    ball_color: string;
    paddle_color: string;
    table_position: string;
    current_table_view: string;
    game_difficulty: string;
    [formLabel : string] : string | boolean
}

interface SettingsProps {
    valuesToPost : UserInfoTypes;
    accountValues : UserInfoTypes;
    updateField : (key : string, value : string | boolean) => void;
    shouldExist : UserInfoTypes;

    setValuesToPost : Dispatch<SetStateAction<UserInfoTypes>>;
    setAccountValues : Dispatch<SetStateAction<UserInfoTypes>>;
}

export type {
    SettingsProps as SettingsProps,
    UserInfoTypes as UserInfoTypes
}