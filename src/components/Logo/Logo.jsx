import css from './Logo.module.css';

export default function Logo(){

    return(
        <>
        <div className={css.logoContainer}>
        <p className={css.logo}>BR</p>  
        </div>
       
        </>
    )
}