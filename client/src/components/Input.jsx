
function Input({ type, placeholder, onChange, id }) {
  return <input
    type={type}
    placeholder={placeholder}
    onChange={onChange}
    id={id}
    required
    className='bg-base-300 w-11/12 max-w-sm p-3 rounded-2xl text-center'
    /> 
}

export default Input;
