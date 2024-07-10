import styles from '@/app/settings/styles.module.css';
import CountriesAndCities from '../countries-cities/countriesAndCities';
import { ChangeEvent, useContext } from 'react';
import { FormContext, SettingsProps } from '../form-components/formContext';
import { GetInput, Props } from '../form-components/input';
import { toast } from 'react-toastify';

function GenerateInputFields() {
    const { oldAccountValues } = useContext<SettingsProps>(FormContext);

    const inputProps = [
        {
            inputId: 'first_name',
            labelText: 'First Name',
            inputType: 'text',
            placeholder: oldAccountValues['first_name'],
            inputLength: 30,
        },
        {
            inputId: 'last_name',
            labelText: 'Last Name',
            inputType: 'text',
            placeholder: oldAccountValues['last_name'],
            inputLength: 30,
        },
        {
            inputId: 'display_name',
            labelText: 'Display Name',
            inputType: 'text',
            placeholder: oldAccountValues['display_name'],
            inputLength: 30,
        },
        {
            inputId: 'username',
            labelText: 'Username',
            inputType: 'text',
            placeholder: oldAccountValues['username'],
            inputLength: 30,
        },
        {
            inputId: 'email',
            labelText: 'Email',
            // inputType: 'email',
            placeholder: oldAccountValues['email'],
            inputLength: 55,
        },
    ];

    return (
        <>
            {inputProps.map(({ inputId, labelText, placeholder, inputLength, inputType }: Props) => {
                return (
                    <div key={inputId}>
                        <GetInput
                            className="p-0 m-0 mt-4 row justify-content-center itim-font"
                            inputType={inputType}
                            inputId={inputId}
                            labelText={labelText}
                            placeholder={placeholder}
                            inputLength={inputLength}
                        ></GetInput>
                    </div>
                );
            })}
            <CountriesAndCities
                className="p-0 m-0 mt-4 row justify-content-center"
                labelText1="Country"
                labelText2="City"
            ></CountriesAndCities>
        </>
    );
}

function AccountTab() {
    const { updateField, currentAccoutValues } = useContext<SettingsProps>(FormContext);

    const handleImageError = (event: ChangeEvent<HTMLImageElement>) => {
        event.target.src = '/assets/images/gameProfiles/default_profile.png';
    };
    return (
        <>
            <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center h-100">
                <div className={`${styles.image_container}`}>
                    <label htmlFor="file_input" className={`${styles.image_container}`}>
                        <img
                            id={`profile_pic`}
                            src={`${currentAccoutValues['image_url'] ?? "/assets/images/gameProfiles/default_profile.png"}`}
                            alt="profile"
                            className={`${styles.profilePic}`}
                            onError={handleImageError}
                        />
                        <img src="/assets/images/icons/Camera.png" alt="camera" className={`${styles.camera}`} />
                    </label>
                    <input
                        type="file"
                        className="d-none"
                        accept="image/*"
                        id="file_input"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const files: FileList | null = e.target.files;

                            if (files && files.length > 0) {
                                const reader = new FileReader();
                                const validImageTypes = [
                                    'image/gif',
                                    'image/jpeg',
                                    'image/png',
                                    'image/webp',
                                    'image/svg',
                                    'image/jpg',
                                    'image/webp',
                                ];
                                if (validImageTypes.includes(files[0].type)) {
                                    reader.readAsDataURL(files[0]);
                                    reader.onloadend = () => {
                                        if (reader.result && typeof reader.result === 'string') {
                                            updateField('image_url', reader.result);
                                        }
                                    };
                                } else {
                                    toast.warn('the file is not an image')
                                }
                            }
                        }}
                    />
                </div>
            </fieldset>
            <fieldset className="col-12 col-xxl-6 p-0 m-0 d-flex justify-content-center align-items-center">
                <div className="row ">
                    <GenerateInputFields />
                </div>
            </fieldset>
        </>
    );
}

export default AccountTab;
export { GetInput };
