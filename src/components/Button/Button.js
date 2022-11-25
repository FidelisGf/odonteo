import './Button.css';

function Button({ onClickFunction, children, id, addClassName, testId }) {
  return (
    <button
      type='button'
      className={`standard-button ${addClassName}`}
      onClick={onClickFunction}
      id={id}
      data-testid={testId}
    >
      { children }
    </button>
  );
}

export default Button;
