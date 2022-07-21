import { useFormik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../../constants";
import querystring from "query-string";
import Api from "../../libs/Api";
import { useMutation } from "react-query";
import { CircleNotch, SpinnerGap } from "phosphor-react";
import { VscLoading } from "react-icons/vsc";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }, []);

  const mutation = useMutation(async (values:any) => {
    const { data } = await Api.post("auth/login", values);

    if (data.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);

      const { dest = "/" } = querystring.parse(location.search);

      navigate(`${dest}`);
    }
  })

  const { handleSubmit, values, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: values => mutation.mutate(values),
  });

  return (
    <div className="h-screen text-base w-full bg-gray-200 flex items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded shadow w-full laptop:w-[500px] laptop:mx-auto gap-5 flex flex-col"
      >
        <div className="flex flex-col">
          <div className="mb-3">
            <h1 className="text-2xl font-bold text-gray-700">
              Infome suas credencias
            </h1>
            <p className="font-light">Bem vindo ao sistema</p>
          </div>
          <input
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            className="px-3 h-10 focus:outline-none border rounded"
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
            className="px-3 h-10 focus:outline-none border rounded"
            type="password"
            placeholder="Senha"
          />
        </div>
        <div className="flex">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full flex justify-center items-center disabled:opacity-50 h-10 bg-indigo-500 text-white rounded uppercase font-bold"
          >
            {mutation.isLoading ? <SpinnerGap className="animate-spin" /> : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}
