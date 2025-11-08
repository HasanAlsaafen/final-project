import { MdTravelExplore } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import { useState } from "react";
import { BiHide } from "react-icons/bi";
import { useFormik } from "formik";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
interface LoginFormValues {
  username: string;
  password: string;
}

const API = "https://hotel.foothilltech.net";
function LoginForm() {
  const [show, setShow] = useState(true);
  const [invalidLogin, setInvalidLogin] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      // To be reviewed later
      const errors: Partial<Record<keyof LoginFormValues, string>> = {};
      if (!values.username) {
        errors.username = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 4) {
        errors.password = "Password must be at least 4 characters";
      }

      return errors;
    },
    onSubmit: (values: LoginFormValues) => {
      console.log("Submitting form with values");
      fetch(`${API}/api/auth/authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then(async (response) => {
          const data = await response.json();
          formik.resetForm();
          if (response.status === 401) {
            setInvalidLogin(true);
            return;
          }

          login(data.authentication, data.userType);
          navigate("/Home");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });
  return (
    <section className=" w-full lg:w-1/2  flex flex-col items-center justify-center  p-8 ">
      <p className="text-2xl font-bold mb-4 text-blue-400 flex items-center justify-center  flex-nowrap gap-1">
        <MdTravelExplore aria-hidden="true" />
        <span>Voyage</span>
      </p>
      <article>
        <h2 className="text-2xl font-semibold font-serif mb-2 text-center">
          Welcome Back!
        </h2>
        <p className="text-gray-600 text-s text-center">
          Sign in to continue your journey.
        </p>
      </article>

      <form className="w-2/3 lg:w-1/2 mt-10" onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formik.values.username}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded-3xl p-2 w-full"
            required
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-s ml-3 mt-1">
              {formik.errors.username}
            </p>
          )}
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type={!show ? "text" : "password"}
            id="password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Enter your password"
            className="border relative border-gray-300 rounded-3xl p-2 w-full"
            required
          />
          {!show ? (
            <BiShow
              aria-hidden="true"
              data-testid="toggle-password"
              className="absolute right-3 top-2/3 -translate-y-1/2 text-xl cursor-pointer"
              onClick={() => {
                setShow((s) => !s);
              }}
            />
          ) : (
            <BiHide
              aria-hidden="true"
              data-testid="toggle-password"
              className="absolute right-3 top-2/3 -translate-y-1/2 text-xl cursor-pointer"
              onClick={() => {
                setShow((s) => !s);
              }}
            />
          )}
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-s ml-3 mt-1 relative">
            {formik.errors.password}
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-300 hover:bg-blue-400 w-full text-white font-semibold rounded-3xl py-2 px-4"
        >
          Sign in
        </button>
      </form>
      {invalidLogin && (
        <p className="text-red-500 text-s mt-2">Invalid username or password</p>
      )}
    </section>
  );
}

export default LoginForm;
