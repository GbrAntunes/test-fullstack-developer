import { Eye, EyeClosed } from "@phosphor-icons/react";
import { useState } from "react";

interface InputProps {
  label: string
  type?: "email" | "text" | "password"
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ label, type="text", placeholder="", value, onChange }: InputProps) {
  const [errorMessage, setErrorMessage] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible)
  }

  return (
    <div className={`border text-gray-5 transition-all ease-in-out duration-300 flex flex-col py-1 px-2 rounded-sm ${errorMessage ? "border-toast-error" : "border-gray-3 focus-within:border-gray-5"}`}>
      <div className="flex justify-between items-center">
        <span className="text-xs">
          {label}
        </span>
        {errorMessage && (
          <span className="text-toast-error text-2xs">
            {errorMessage}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <input
          type={
            type === "password"
              ? (
                isPasswordVisible ? "text" : "password"
              )
              : type
          }
          placeholder={placeholder}
          className="bg-gray-1 text-sm focus:outline-none py-1 px-1 flex-1"
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button type="button" onClick={() => togglePasswordVisibility()}>
            { isPasswordVisible
              ? <EyeClosed />
              : <Eye />
            }
          </button>
        )}
      </div>
    </div>
  );
}

export default Input
