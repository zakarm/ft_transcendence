import styles from './styles.module.css'
import { ChangeEvent, useEffect, useState, useContext } from 'react'
import { FormContext } from './page'

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
        id="",
    } : Props) {
    
    const   {accountValues, setValues} = useContext(FormContext);

    const   [selectedCountry, setselectedCountry] = useState<string>(accountValues['country']);
    const   [selectedCity, setSelectedCity] = useState<string>(accountValues['city']);

    const   [citiesOptions, setCitiesOptions] = useState<string[]>([])
    const   [countryOptions, setcountryOptions] = useState<string[]>([])

    useEffect(() => {

        let countryOption : string[] = Object.keys(data).map((country) => (
            <option key={country} value={country}>{country}</option>
        ));
        setcountryOptions(countryOption)

    }, []);

    let cities : string[] = [];
    useEffect(() => {
        if (selectedCountry && data[selectedCountry]) {

            cities = data[selectedCountry].filter((value, index) => (
                data[selectedCountry].indexOf(value) === index
                ));
            
            setCitiesOptions(cities.map((city: string) => (
                <option key={city} value={city}>{city}</option>
            )));
        } else {
            setCitiesOptions(<option key="--" value="--">--</option>)
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
                            id={id}
                            onChange={ (e: ChangeEvent<HTMLInputElement>) => { setselectedCountry(e.target.value) } }>
                            <option
                                className={`itim-font ${styles.input}`}
                                hidden
                                value={ selectedCountry }>
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
                <div className={`col-6 ${styles.inputHolder} row justify-content-center p-0 m-1`}>

                    <select 
                        className={`itim-font ${styles.input} ps-4`}
                        name="countries"
                        id={id}
                        onChange={ (e : ChangeEvent<HTMLInputElement>) => { setSelectedCity(e.target.value) } }>
                        <option
                            className={`itim-font`}
                            hidden
                            value={ selectedCity }>
                                { selectedCity  || "--"}
                        </option>

                        { citiesOptions }

                        
                    </select>
                </div>
            </div>
        </>
    );
}

export default CountriesAndCities;