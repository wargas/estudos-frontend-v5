import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "@app/constants";
import querystring from "query-string";
import Api from "@app/libs/Api";
import { useMutation } from "react-query";
import { SpinnerGap } from "phosphor-react";
import BeatLoader from 'react-spinners/BeatLoader'

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

  const { handleSubmit, values, handleBlur, handleChange, getFieldProps } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: values => mutation.mutate(values),
  });

  return (
    <div className="h-screen text-base w-full bg-gray-50 flex items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full laptop:w-[480px] laptop:mx-auto gap-5 flex flex-col"
      >
        <div className="flex flex-col">
          <div className="mb-10">
            <h1 className="text-6xl font-bold text-gray-700">
              Infome suas credencias
            </h1>
            <p className="font-light">Bem vindo ao sistema</p>
          </div>
          <input
            {...getFieldProps('email')}
            className="px-3 h-10 focus:outline-none border rounded"
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col">
          <input
            {...getFieldProps('password')}
            className="px-3 h-10 focus:outline-none border rounded"
            type="password"
            placeholder="Senha"
          />
        </div>
        <div className="flex">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full flex justify-center items-center disabled:opacity-50 h-10 bg-indigo-600 text-white rounded uppercase font-bold"
          >
            {mutation.isLoading ? <BeatLoader color="white" size={5} /> : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}
