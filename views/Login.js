"use client"

import { useState, useContext } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

// icons
import CloseIcon from "@/icons/close-icon"
import EyeIcon from "@/icons/eye-icon"
import EyeCloseIcon from "@/icons/eye-close-icon"
import LoginIcon from "@/icons/login-icon"

// context
import ToastContext from "@/context/ToastContext"

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
})

// DUMMY CREDENTIAL
const USERNAME = "dpierrof"
const PASSWORD = "Vru55Y4tufI4"

const Login = ({ host }) => {
  const router = useRouter()

  const addToast = useContext(ToastContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: USERNAME,
      password: PASSWORD,
    },
    resolver: yupResolver(schema),
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      await axios({
        url: `${host}/api/login`,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(data),
      })

      addToast({
        type: "success",
        message: "Login Successfully",
      })

      router.push("/")
    } catch(err) {
      if ('response' in err && 'status' in err.response && err.response.status === 400) {
        setErrorMessage(err.response.data.message)
        return
      }

      addToast({
        type: "failed",
        message: "Login failed",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-w-screen w-full min-h-screen h-full text-gray-700">
      <div className="flex flex-col gap-5 bg-white w-full h-auto sm:w-[450px] shadow-none sm:shadow-md rounded-md px-6 py-5">
        <h2 className="text-xl text-center font-medium">
          <strong className="text-purple-500 font-semibold">Purple</strong> Dashboard
        </h2>

        {errorMessage && (
          <div className="flex justify-between items-center rounded-md border border-red-200 bg-red-50 text-red-900 px-3 py-2">
            {errorMessage}

            <button onClick={() => setErrorMessage('')}>
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        <form
          autoComplete="off"
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="font-medium"
            >
              Username
            </label>
            <input
              {...register("username")}
              id="username"
              placeholder="Username"
              className="w-full px-3 py-2 outline-none border border-gray-400 focus:border-purple-500 hover:border-purple-500 rounded-md"
            />
            {!!errors.username && errors.username.message && (
              <small className="text-red-500">{errors.username.message}</small>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="font-medium"
            >
              Password
            </label>
            <div className="flex gap-2 w-full border border-gray-400 focus:border-purple-500 hover:border-purple-500 rounded-md overflow-hidden">
              <input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-[90%] px-3 py-2 outline-none"
              />

              <button
                className="w-[10%] flex justify-center items-center"
                onClick={() => setShowPassword(prevState => !prevState)}
                type="button"
              >
                {showPassword ? (
                  <EyeCloseIcon className="w-4 h-4" />            
                ) : (
                  <EyeIcon className="w-4 h-4" />
                )}
              </button>
            </div>
            {!!errors.password && errors.password.message && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>

          <button
            className={`flex justify-center items-center gap-1 w-full rounded-md bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 ${isLoading ? 'cursor-wait' : ''}`}
            disabled={isLoading}
            type="submit"
          >
            {!isLoading ? (
              <>
                Login

                <LoginIcon className="w-5 h-5" />
              </>
            ) : "Please wait ..."}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login