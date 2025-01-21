import { GoChevronRight } from "react-icons/go";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <h1 className={css.title}>Books Reading</h1>
      <h2 className={css.smallTitle}>Will help you to</h2>
      <div className={css.textWrap}>
               <p className={css.text}> <GoChevronRight className={css.accent} />Create your goal faster and proceed to read</p>
               <p className={css.text}> <GoChevronRight className={css.accent}/>Divide process proportionally for each day</p>
               <p className={css.text}> <GoChevronRight className={css.accent}/>Track your success</p>
      </div>

      <h2 className={css.smallTitle}>You may also</h2>
      <div className={css.textWrap}>
                <p className={css.text}> <GoChevronRight className={css.accent}/>Pose your own independent point of view</p>
                <p className={css.text}> <GoChevronRight className={css.accent}/>
          Improve your professional skills according to new knowledge
        </p>
                <p className={css.text}> <GoChevronRight className={css.accent}/>Become an interesting interlocutor</p>
      </div>

      <div className={css.btnWrap}>
        <button className={css.loginBtn}>Log in</button>
        <button className={css.registerBtn}>Register</button>
      </div>
    </>
  );
}
