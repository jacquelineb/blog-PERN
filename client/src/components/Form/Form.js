import React from 'react';
import style from './Form.module.scss';

const Input = ({ children, ...props }) => <input {...props} />;
const Label = ({ children, ...props }) => <label {...props}>{children}</label>;

const Section = ({ children, ...props }) => (
  <div className={style.formSection} {...props}>
    {children}
  </div>
);

const SubmitButton = ({ children, ...props }) => (
  <button type='submit' {...props}>
    {children}
  </button>
);

function Form({ children, onSubmit }) {
  return (
    <form className={style.Form} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

Form.Input = Input;
Form.Label = Label;
Form.SubmitButton = SubmitButton;
Form.Section = Section;

export default Form;
