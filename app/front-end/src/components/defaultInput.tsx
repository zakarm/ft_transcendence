import styles from './styles/defaultInput.module.css'

interface Props
{
    type? : string;
    placeholder? : string;
    name? : string;
}

export default function DefaultInput({type, placeholder, name} : Props)
{
    return (
        <input className={`form-control ${styles.input_class} p-3 mb-3 border-0`} type={type} placeholder={placeholder} name={name} required/>
    );
}