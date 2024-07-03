import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth,db } from "../contexts/Firebase";
import {setDoc,doc} from "firebase/firestore"
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Form validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function RegisterModal({ setShowLogin }) {
  const { setUser } = useContext(AuthContext); // Access AuthContext
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data,e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, data.email);
      if (signInMethods.length > 0) {
        toast.error(
          "This email is already registered. Please use a different email or try logging in."
        );
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const firebaseUser = userCredential.user;
if(firebaseUser)
  {
    await setDoc(doc(db, "users", firebaseUser.uid), {
      name: data.name,
      email: data.email,
    });
  }
      

      // Set authenticated user in AuthContext
      setUser(firebaseUser);

      toast.success("Registration successful!");
      setShowLogin(true);
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "An error occurred during registration.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email is already registered.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak.";
      }
      
      toast.error(errorMessage);
    }  finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-around h-full p-6 overflow-y-auto">
      <img
        src="https://cdn-icons-png.flaticon.com/128/3670/3670333.png"
        alt="Mintra-logo"
        className="w-14 h-14 mb-10"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
        <InputField
          type="text"
          name="name"
          placeholder="Name"
          register={register}
          error={errors.name}
        />
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          register={register}
          error={errors.email}
        />
        <InputField
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          register={register}
          error={errors.password}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <InputField
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          register={register}
          error={errors.confirmPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <SubmitButton loading={loading} />
        <LoginLink setShowLogin={setShowLogin} />
      </form>
      {loading && <LoadingOverlay />}
      <SocialLoginSection />
    </div>
  );
}

// Input field component with optional password visibility toggle
const InputField = ({
  type,
  name,
  placeholder,
  register,
  error,
  showPassword,
  setShowPassword,
}) => (
  <>
    <label className="input input-bordered flex items-center rounded-sm bg-white border-gray-500 gap-2">
      <input
        type={type}
        {...register(name)}
        className="grow font-thin"
        placeholder={placeholder}
      />
      {(name === "password" || name === "confirmPassword") && (
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </label>
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </>
);

// Submit button component with loading state
const SubmitButton = ({ loading }) => (
  <button
    type="submit"
    className="btn w-full disabled:bg-white disabled:text-rose-500 text-rose-500 text-lg tracking-wide hover:bg-rose-500 border-none shadow-xl rounded-full bg-white hover:text-white transition-all"
    disabled={loading}
  >
    {loading ? "Registering..." : "REGISTER"}
  </button>
);

// Link to switch to login form
const LoginLink = ({ setShowLogin }) => (
  <div className="my-2 text-center">
    <p>
      Already have an account?{" "}
      <span
        className="font-semibold text-rose-500 cursor-pointer"
        onClick={() => setShowLogin(true)}
      >
        Login
      </span>
    </p>
  </div>
);

// Loading overlay component
const LoadingOverlay = () => (
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="spinner-border text-rose-500" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

// Social login section component
const SocialLoginSection = () => (
  <>
    <div className="flex items-center justify-center mt-5">
      <div className="w-full h-[1px] bg-gray-500"></div>
      <p className="flex-shrink-0 text-sm px-5 text-gray-500 font-semibold">
        OR CONNECT WITH
      </p>
      <div className="w-full h-[1px] bg-gray-500"></div>
    </div>
    <div className="btn gap-5 mt-5 hover:scale-110 transition-all duration-500">
      <img
        src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
        alt="Google Logo"
        className="w-6 h-6"
      />
      <p className="text-white tracking-wide">Sign in with Google</p>
    </div>
  </>
);

export default RegisterModal;
