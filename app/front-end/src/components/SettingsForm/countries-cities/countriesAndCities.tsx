import styles from '@/app/settings/styles.module.css'
import React, { ChangeEvent, useEffect, useState, useContext, useRef, MutableRefObject } from 'react'
import { FormContext, SettingsProps } from '../form-components/formContext'

const data : {[country : string] : string[]} = require('./countries.min.json')

interface Props {
    className ?: string;
    labelText1 ?: string;
    labelText2 ?: string;
    id ?: string;
    renderCountries ?: boolean;
}

function    CountriesAndCities(
    {
        className="",
        labelText1="",
        labelText2="",
        id="country",
    } : Props) {

    const   {currentAccoutValues, updateField} = useContext<SettingsProps>(FormContext);

    const   [selectedCountry, setselectedCountry] = useState<string>(currentAccoutValues['country'] as string);
    const   [selectedCity, setSelectedCity] = useState<string>(currentAccoutValues['city'] as string);

    const   [citiesOptions, setCitiesOptions] = useState<React.JSX.Element[]>([])
    const   [countryOptions, setcountryOptions] = useState<React.JSX.Element[]>([])

    let isFirstRender = useRef<boolean>(true);
    let i = useRef<number>(0);

    useEffect(() => {

        let countryOption : React.JSX.Element[] = Object.keys(data).map((country) => (
            <option key={country} value={country}>{country}</option>
        ));
        setcountryOptions(countryOption)

    }, []);

    useEffect(() => {
        setselectedCountry(currentAccoutValues['country'] as string);
        setSelectedCity(currentAccoutValues['city'] as string);
    }, [currentAccoutValues])

    useEffect(() => {
        if ( ! isFirstRender.current) {
            setSelectedCity("--");
            updateField("city", "");
        } else {
            if (i.current > 0) {
                isFirstRender.current = false;
            }
            i.current += 1;
        }

    }, [currentAccoutValues['country']]);

    let cities : string[] = [];
    useEffect(() => {
        if (selectedCountry && data[selectedCountry as string]) {

            cities = data[selectedCountry as string].filter((value, index) => (
                data[selectedCountry as string].indexOf(value) === index
                ));

            setCitiesOptions(cities.map((city: string) => (
                <option key={city} value={city}>{city}</option>
            )));
        } else {
            setCitiesOptions([<option key="--" value="--">--</option>])
        }
    }, [selectedCountry]);

    return (
        <>
            <div className={`${className} flex-wrap flex-xl-nowrap`}>
                <label
                    className={`col-8 col-sm-3  itim-font d-flex align-items-center p-0 m-0 ${styles.inputTitle}`}
                    htmlFor={id}>
                    {labelText1}
                </label>
                <div className={`col-6 ${styles.inputHolder} row justify-content-center p-0 m-1`}>
                        <select
                            className={`itim-font ${styles.input} ps-4`}
                            name="countries"
                            autoComplete="off"
                            id={id}
                            data-testid={id}
                            onChange={ (e: ChangeEvent<HTMLSelectElement>) => {
                                setselectedCountry(e.target.value);
                                updateField("country", e.target.value);
                            } }>
                            <option
                                className={`itim-font ${styles.input}`}
                                hidden
                                value={ selectedCountry as string}>
                                    { selectedCountry || "Choose a country"}
                            </option>

                            { countryOptions }

                        </select>
                </div>
            </div>
            <div className={`${className} flex-wrap flex-xl-nowrap`}>
                <label
                    className={`col-8 col-sm-3  itim-font d-flex align-items-center p-0 m-0 ${styles.inputTitle}`}
                    htmlFor={id}>
                    {labelText2}
                </label>
                <div className={`col-6 ${styles.inputHolder} row justify-content-center p-0 mb-4`}>

                    <select
                        className={`itim-font ${styles.input} ps-4`}
                        name="city"
                        id="city"
                        data-testid="city"
                        autoComplete="off"
                        onChange={ (e : ChangeEvent<HTMLSelectElement>) => {
                            setSelectedCity(e.target.value);
                            updateField("city", e.target.value);
                        } }>
                        <option
                            className={`itim-font`}
                            hidden
                            value={ selectedCity as string}>
                                { selectedCity as string  || "--"}
                        </option>

                        { citiesOptions }


                    </select>
                </div>
            </div>
        </>
    );
}

export default CountriesAndCities;
