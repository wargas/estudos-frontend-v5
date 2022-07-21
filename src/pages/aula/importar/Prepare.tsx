import { useFormik } from "formik";

import React, { ChangeEvent, ChangeEventHandler, useRef } from "react";
import { useParams } from "react-router-dom";
import Api from "../../../libs/Api";

type Props = {
  onChange: (data: any) => void;
};

function Prepare({onChange}: Props) {
    const {aula_id = ''} = useParams()
  const { handleSubmit, handleChange, values, setValues } = useFormik({
    initialValues: {
      texto: "",
    },
    onSubmit: async ({texto}) => {
        const data = new Blob([texto], {type: 'text/plain'})
        const file = new File([data], 'texto')

        const formData = new FormData()

        formData.append('file', file)
        formData.append('aula_id', aula_id)


        const {data: _data} = await Api.post(`questoes/prepare`, formData)
        setValues({texto: ''})
        onChange(_data)
    },
  });

  const inputFileRef = useRef<HTMLInputElement>(null);
  function handleChangeFile(ev: ChangeEvent<HTMLInputElement>) {
    const files = ev.target.files;
    const read = new FileReader();

    read.onload = () => {
      setValues({
        texto: `${read.result}`
      })
    };

    if (files && files.length > 0) {
      read.readAsText(files[0]);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        onChange={handleChangeFile}
        ref={inputFileRef}
        type="file"
        className="hidden"
      />
      <div className="p-5">
        <textarea
          name="texto"
          value={values.texto}
          onChange={handleChange}
          placeholder="Cole ou importe um arquivo"
          className="resize-none w-full focus:outline-none font-mono"
        ></textarea>
      </div>
      <div className="p-5 border-t flex justify-between">
        <button
          type="button"
          onClick={() => inputFileRef?.current?.click()}
          className="text-primary-500 font-bold uppercase text-base"
        >
          Importar arquivo
        </button>
        <button
        disabled={values.texto === ''}
          type="submit"
          className="text-primary-500 disabled:opacity-25 font-bold uppercase text-base"
        >
          Preparar questões
        </button>
      </div>
    </form>
  );
}

export default Prepare;
