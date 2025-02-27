function Button({ onClick, text, className, type='submit' }) {
  return <button type={type} onClick={onClick} className={`btn ${className} btn-neutral w-11/12 p-3 rounded-2xl max-w-sm`}>
    { text }
  </button>
}

export default Button;
