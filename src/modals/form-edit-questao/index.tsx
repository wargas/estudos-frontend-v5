import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaExpand, FaExpandAlt, FaFulcrum } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MarkdownEditor from "../../components/mardown-editor";
import PageLoading from "../../components/page-loading";
import Api from "../../libs/Api";
import { useModal } from "../../providers/modal";

export default function FormEditQuestao() {
  const params = useParams();
  const [showPW, setShowPW] = useState(false);
  const { closeModal, setOptions } = useModal();

  const [full, setFull] = useState(false)

  const queryClient = useQueryClient()

  const { values, setValues, handleBlur, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: {
        enunciado: "",
        alternativas: "",
        gabarito: "",
      },
      onSubmit: (values) => {
        mutation.mutate(values)
      },
    });

  const questaoQuery = useQuery(["questao", params.id], async () => {
    const { data } = await Api.get(`questoes/${params.id}`);

    setValues({
      enunciado: data?.enunciado,
      alternativas: data?.alternativas
        ?.map((a: any) => a.conteudo)
        .join("\n***\n"),
      gabarito: data?.gabarito,
    });
  }, {
    refetchOnWindowFocus: false
  });

  const mutation = useMutation(async (_values:any) => {
    const values = {
        ..._values,
        alternativas: _values.alternativas.split('***').map((a: string) => a.replace(/^\n+/, "").replace(/\n+$/, ""))
    }
    const { data} = await Api.put(`questoes/${params.id}`, values)

    return data;
  }, {
    onSuccess: (response) => {
       closeModal(response)
    }
  })

  useEffect(() => {
    setOptions({size: full ? 'w-full' : 'w-1/2'})
  }, [full])

  return (
    <div className="relative h-screen flex flex-col">
      <div className="border-b p-4 h-14 flex justify-between">
        <h1 className="text-lg font-bold text-gray-800">Editar Questão</h1>
        <div>
          <button onClick={() => setFull(!full)}>
            <FaExpandAlt />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1  flex-col gap-5 p-5">
        <div className="flex flex-col flex-1">
          <label className="text-gray-700 text-base">Enunciado</label>
          <MarkdownEditor value={values.enunciado} onChange={(v) => setFieldValue('enunciado', v)} />
          {/* <textarea
            onChange={handleChange}
            onBlur={handleBlur}
            name="enunciado"
            value={values.enunciado}
            className="border rounded h-36 p-3 font-mono flex-1"
          ></textarea> */}
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-gray-700 text-base">Alternativas</label>
          <MarkdownEditor value={values.alternativas} onChange={(v) => setFieldValue('alternativas', v)} />
          {/* <textarea
            onChange={handleChange}
            onBlur={handleBlur}
            name="alternativas"
            value={values.alternativas}
            className="border rounded h-36 p-3 font-mono flex-1"
          ></textarea> */}
        </div>
        <div className="flex">
          <div className="flex flex-col relative">
            <label className="text-gray-700 text-base">Gabarito</label>
            <div className="flex border h-9 rounded px-5">
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="gabarito"
                value={values.gabarito}
                className="focus:outline-none"
                type={showPW ? "text" : "password"}
              />
              <button type="button" onClick={() => setShowPW(!showPW)} className="">
                {showPW ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>
          </div>
          <div className="flex items-end justify-end flex-1">
            <button type="submit" className="bg-primary-600 rounded px-5 h-9 text-white">
              Salvar
            </button>
          </div>
        </div>
      </form>
      <PageLoading show={questaoQuery.isLoading} />
    </div>
  );
}
