import styles from './styles/button.module.css'

interface Props{
    value? : string;
}

export default function ButtonValo({value}: Props) {
    return (
        <>
            <div className="pm col-6 col-sm-4 col-xl-2 m-0">
                <button
                    className={`pm shadow col-12 valo-font ${styles.submit_button} p-0 my-3`}
                    type="submit">
                        {value}
                </button>
            </div>
        </>
    );
}