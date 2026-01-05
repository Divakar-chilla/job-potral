

const Inputs = ({name,value,handelchange,children}) => {
  const inputType = (name === "password" || name === "re_type_password") ? "password" : "text"
  const displayName = typeof name === 'string' ? name.replace(/_/g, ' ') : name
  return (
    <>
    <div className={`w-full h-10 flex justify-center items-center relative border-b-2 p-2
              group focus-within:border-2 focus-within:rounded-sm ${value ? "border-2": ""} ` }>
                <input type={inputType} name={name} id={name} value={value} className="size-full outline-0 " onChange={handelchange} />
                <label htmlFor={name} className={`absolute duration-100  left-2 group-focus-within:-top-3.5
                group-focus-within:bg-white group-focus-within:text-[12px] p-1 ${value ? "-top-3.5 bg-white text-[12px]" : "top-1"} `}>{displayName}</label>
                {children}

              </div>
              </>
  )
}

export default Inputs;