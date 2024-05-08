import data from './countries.min.json'
import styles from './styles.module.css'
// import useEffect from ''

function    CountriesAndCities({className="", labelText="", country="", id=""} : {className : string, labelText : string, country : string, id : string}) {

    const countryOptions = Object.keys(data).map(country => (
        <option key={country} value={country}>{country}</option>
    ));
    return (
    <div key={id}>
        <div className={`${className} flex-wrap flex-xl-nowrap`}>
            <label
                className={`col-8 col-sm-3  itim-font d-flex align-items-center p-0 m-0 ${styles.inputTitle}`} 
                htmlFor={id}>
                {labelText}
            </label>
            <div className={`col-6 ${styles.inputHolder} row justify-content-center p-0 m-1`}>
                <select className={`itim-font ${styles.input} ps-4`} name="countries" id={id}>
                    <option selected="selected" className={`itim-font`}>
                        choose a country
                    </option>
                    {countryOptions}
                </select>
            </div>
        </div>
        </div>
    );
}

export default CountriesAndCities;