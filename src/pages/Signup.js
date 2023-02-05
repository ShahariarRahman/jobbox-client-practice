import React, { useEffect, useState } from "react";
import loginImage from "../assets/login.svg";
import { useForm, useWatch } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, toggleError } from "../features/auth/authSlice";
import { toast } from "react-hot-toast";
const Signup = () => {
  const [disabled, setDisabled] = useState(true);
  const { handleSubmit, register, reset, control } = useForm();
  const password = useWatch({ control, name: "password" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user: { email },
    isLoading,
    isError,
    error,
  } = useSelector((state) => state.auth);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (
      password !== undefined &&
      password !== "" &&
      confirmPassword !== undefined &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Signing in...", { id: "userAuth" });
    }
    if (!isLoading && email) {
      toast.success("Signing Successful", { id: "userAuth" });
      navigate(from, { replace: true });
    }
    if (!isLoading && isError) {
      toast.error(error, { id: "userAuth" });
      dispatch(toggleError());
    }
  }, [isLoading, email, isError, error, dispatch, navigate, from]);

  const onSubmit = ({ email, password }) => {
    dispatch(createUser({ email, password }));
  };

  const handleGoogleLogin = () => {};

  return (
    <div className="flex h-screen items-center pt-14">
      <div className="w-1/2">
        <img src={loginImage} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-[#FFFAF4] rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="ml-5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email")}
                />
              </div>

              <div className="flex flex-col items-start">
                <label htmlFor="password" className="ml-5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...register("password")}
                />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="confirm-password" className="ml-5">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  {...register("confirmPassword")}
                />
              </div>
              <div className="!mt-8 ">
                <button
                  type="submit"
                  className="font-bold text-white py-3 rounded-full bg-primary w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={disabled}
                >
                  Sign up
                </button>
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </p>
              </div>
              <button
                type="button"
                className="font-bold text-white py-3 rounded-full bg-primary w-full"
                onClick={handleGoogleLogin}
              >
                Login with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
