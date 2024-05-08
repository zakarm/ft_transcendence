// import data from './countries.min.json'
import styles from './styles.module.css'
// import useEffect from ''
const data : {[country : string] : string[]} = require('./countries.min.json')

interface Props {
    className ?: string;
    labelText ?: string;
    country ?: string;
    id ?: string;
    currentCountry ?: string;
    currentCity ?: string;
}

function    CountriesAndCities(
    {
        className="",
        labelText="",
        country="",
        id="",
        currentCountry="Choose a country",
        currentCity="--"
    } : Props) {

    const countryOptions = Object.keys(data).map((country, i : number) => (
        <option key={country} value={country}>{country}</option>
    ));
    
    let   citiesOptions : string[]= [];
    if (country !== "") {
        citiesOptions = data[country] || [];
        citiesOptions = citiesOptions.map((city, i : number) => {
            return <option key={city} value={city}>{city}</option>
        });
    }
    return (
        // <div key={id}>
            <div className={`${className} flex-wrap flex-xl-nowrap`}>
                <label
                    className={`col-8 col-sm-3  itim-font d-flex align-items-center p-0 m-0 ${styles.inputTitle}`} 
                    htmlFor={id}>
                    {labelText}
                </label>
                <div className={`col-6 ${styles.inputHolder} row justify-content-center p-0 m-1`}>
                {country === "" ?
                    <select className={`itim-font ${styles.input} ps-4`} name="countries" id={id}>
                            <option className={`itim-font`} value={currentCountry}>
                               {currentCountry}
                            </option> 
                        
                        {countryOptions}
                    </select>
                :
                <select className={`itim-font ${styles.input} ps-4`} name="countries" id={id}>
                    <option className={`itim-font`} value={currentCity}>
                        {currentCity}
                    </option>
                    {citiesOptions}
                </select>
                }
                </div>
            </div>
        // </div>
    );
}

export default CountriesAndCities;