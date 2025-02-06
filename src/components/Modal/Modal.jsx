import css from "./Modal.module.css"
import PropTypes from 'prop-types';


export default function Modal({ isOpen, onClose }){
  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target.className.includes('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.close} onClick={onClose}>
          &times;
        </button>
       
        <form className={css.form}>
          <label className={css.label}>
          Book title
            <input className={css.input} type="text" name="title" required  placeholder="..."/>
          </label>
          <label className={css.label}>
          Author
            <input className={css.input} type="text" name="author" required placeholder="..."/>
          </label>
          <label className={css.label}>
          Publication date
            <input className={css.input} type="number" name="pages" required placeholder="..."/>
          </label>
           <label className={css.label}>
           Amount of pages
            <input className={css.input} type="number" name="pages" required placeholder="..."/>
          </label>
          
          <button className={css.addBtn} type="submit" >
          Add
          </button>
        </form>

      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

