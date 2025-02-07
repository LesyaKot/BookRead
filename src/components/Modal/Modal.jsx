import css from "./Modal.module.css"
import PropTypes from 'prop-types';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../../redux/book/operations";

export default function Modal({ isOpen, onClose }){
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [pagesTotal, setPagesTotal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !publishYear.trim() || !pagesTotal.trim()) return;

    const newBook = { title, author, publishYear, pagesTotal  };
    dispatch(addBook(newBook));
    
    setTitle("");
    setAuthor("");
    setPagesTotal("");
    setPublishYear("");
  };

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
       
        <form className={css.form} onSubmit={handleSubmit}>
          <label className={css.label} >
          Book title
            <input className={css.input} type="text" name="title" value={title}
          onChange={(e) => setTitle(e.target.value)}
          required  placeholder="..."/>
          </label>

          <label className={css.label}>
          Author
            <input className={css.input} type="text" name="author" value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required placeholder="..."/>
          </label>

          <label className={css.label}>
          Publication date
            <input className={css.input} type="text" value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
          required placeholder="..."/>
          </label>

           <label className={css.label}>
           Amount of pages
          <input className={css.input} type="text"
          value={pagesTotal}
         onChange={(e) => setPagesTotal(e.target.value)}
         required placeholder="..."/>
          </label>
          
          <button className={css.addBtn} type="submit" >
          Add
          </button>
        </form>


<div>
<h2>Step 1.</h2>
<h3>Create your own library</h3>
<p>Add there books which you are going to read.</p>
<h2>Step 2.</h2>
<h3>Create your first training</h3>
<p>Set a goal, choose period, start training.</p> 
</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  
};

