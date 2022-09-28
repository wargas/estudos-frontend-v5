import { Tab } from "@headlessui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import MarkdownEditor from "../../components/mardown-editor";
import PageLoading from "../../components/page-loading";
import { Questao } from "../../interfaces/Questao";
import Api from "../../libs/Api";
import { useModal } from "../../providers/modal";

const tabs = [
  {
    label: 'Enunciado',
    key: 'enunciado',
  },
  {
    label: 'Alternativas',
    key: 'alternativas',
  },
  {
    label: 'Resolução',
    key: 'resolucao',
  }
]

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
        resolucao: ""
      },
      onSubmit: (values) => {
        mutation.mutate(values)
      },
    });

  const questaoQuery = useQuery(["questao", params.id], async () => {
    const { data } = await Api.get<Questao>(`questoes/${params.id}`);

    setValues({
      enunciado: data?.enunciado,
      alternativas: data?.alternativas
        ?.map((a: any) => a.conteudo)
        .join("\n***\n"),
      gabarito: data?.gabarito,
      resolucao: data.resolucao || ''
    });
  }, {
    refetchOnWindowFocus: false
  });

  const mutation = useMutation(async (_values: any) => {
    const values = {
      ..._values,
      alternativas: _values.alternativas.split('***').map((a: string) => a.replace(/^\n+/, "").replace(/\n+$/, ""))
    }
    const { data } = await Api.put(`questoes/${params.id}`, values)

    return data;
  }, {
    onSuccess: (response) => {
      closeModal(response)
    }
  })

  useEffect(() => {
    setOptions({ size: full ? 'w-full' : 'w-1/2' })
  }, [full])

  return (
    <div className="relative h-screen flex flex-col">

      <form onSubmit={handleSubmit} className="flex flex-1  flex-col gap-5 p-0">
        <Tab.Group as='div' className={'flex-1'}>
          <Tab.List className={'mb-4 bg-primary-800 text-white'}>
            {tabs.map(t => (
              <Tab as='button' key={t.key}
                className='transition-colors text-base ui-selected:font-bold ui-selected:bg-primary-700 px-4 desktop:px-8 h-14 focus:outline-none'>
                {t.label}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel key={'enunciado'}>
              <MarkdownEditor value={values.enunciado} onChange={(v) => setFieldValue('enunciado', v)} />
            </Tab.Panel>
            <Tab.Panel key={'alternativas'}>
              <MarkdownEditor value={values.alternativas} onChange={(v) => setFieldValue('alternativas', v)} />
            </Tab.Panel>
            <Tab.Panel key={'resolucao'}>
              <MarkdownEditor value={values.resolucao || ''} onChange={(v) => setFieldValue('resolucao', v)} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>




        <div className="flex p-5">
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
