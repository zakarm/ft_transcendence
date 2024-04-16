
import styles from './style.module.css';
import Image from 'next/image';

export default function ()
{
    return (
        <>
        <div className={`${styles.container} vh-100 border`}>
            <div className={`${styles.bg_holder} vh-100`}></div>
                <div className={`${styles.holder} vh-100`}>
                    <div>
                        <Image className={``} width={60} height={60} src="/profile.jpeg" alt='Profile'/>
                    </div>
                    <hr className="dropdown-divider" />
                    <div>
                        down
                    </div>
                </div>
        </div>
        </>
    );
}