import React, { useState, useContext } from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../contexts/Firebase";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext
import { toast } from "react-toastify";
import RegisterModal from "./RegisterModal";
import "react-toastify/dist/ReactToastify.css";

// Form validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LoginModal() {
  const { setUser } = useContext(AuthContext); // Access AuthContext
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toggleModal = (action) => {
    const modal = document.getElementById("my_modal_3");
    modal[action]();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const firebaseUser = userCredential.user;

      // Set authenticated user in AuthContext
      setUser(firebaseUser);

      toast.success("Login successful!");
      toggleModal("close");
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderLoginForm = () => (
    <div className="flex flex-col mt-6 items-center justify-around">
      <img
        src="https://cdn-icons-png.flaticon.com/128/3670/3670333.png"
        alt="Mintra-logo"
        className="w-14 h-14 mb-10"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
        <InputField
          type="email"
          placeholder="Email"
          register={register}
          name="email"
          error={errors.email}
        />
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          register={register}
          name="password"
          error={errors.password}
          showPassword={showPassword}
          togglePassword={() => setShowPassword(!showPassword)}
        />
        <span className="text-blue-500 cursor-pointer">Forgot Password</span>
        <SubmitButton loading={loading} />
      </form>
      <ToggleRegister setShowLogin={setShowLogin} />
      <SocialLogin />
    </div>
  );

  return (
    <>
      <button  onClick={() => toggleModal("showModal")}>
        <FaUser className="text-[#eb2540] " />
      </button>
      <dialog id="my_modal_3" className="modal  text-gray-800">
        <div className="modal-box min-w-fit bg-white">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => toggleModal("close")}
          >
            ✕
          </button>
          {showLogin ? renderLoginForm() : <RegisterModal setShowLogin={setShowLogin} />}
        </div>
      </dialog>
    </>
  );
}

const InputField = ({
  type,
  placeholder,
  register,
  name,
  error,
  showPassword,
  togglePassword,
}) => (
  <>
    <label className="input input-bordered flex items-center rounded-sm bg-white border-gray-500 gap-2">
      <input
        type={type}
        {...register(name)}
        className="grow font-thin"
        placeholder={placeholder}
      />
      {name === "password" && (
        <span onClick={togglePassword} className="cursor-pointer">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </label>
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </>
);

const SubmitButton = ({ loading }) => (
  <button
    type="submit"
    className="btn duration-500 w-full text-rose-500 text-lg tracking-wide hover:bg-rose-500 border-none shadow-xl rounded-full bg-white hover:text-white transition-all"
    disabled={loading}
  >
    {loading ? "Logging in..." : "LOGIN"}
  </button>
);

const ToggleRegister = ({ setShowLogin }) => (
  <div className="my-2">
    <p>
      Don't have an account?{" "}
      <span
        className="font-semibold text-rose-500 cursor-pointer"
        onClick={() => setShowLogin(false)}
      >
        Register
      </span>
    </p>
  </div>
);

const SocialLogin = () => (
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

export default LoginModal;
