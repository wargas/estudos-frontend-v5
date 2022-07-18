import { useFormik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../../constants";
import querystring from "query-string";
import Api from "../../libs/Api";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }, []);

  const { handleSubmit, values, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
        const { data } = await Api.post('auth/login', values)

        if(data.token) {
            localStorage.setItem(AUTH_TOKEN_KEY, data.token)

            const {dest = '/'} = querystring.parse(location.search)

            navigate(`${dest}`)
        }
    },
  });

  return (
    <div className="h-screen text-base w-full bg-gray-200 pt-10">
      <p>{location.search}</p>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full laptop:w-[500px] laptop:mx-auto shadow flex flex-col divide-y"
      >
        <div className="flex flex-col">
          <input
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            className="px-3 h-10 focus:outline-none"
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col">
          <input
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            className="px-3 h-10 focus:outline-none"
            type="password"
            placeholder="Senha"
          />
        </div>
        <div className="flex">
          <button
            type="submit"
            className="w-full h-10 bg-indigo-500 text-white"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
