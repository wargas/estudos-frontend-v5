import { useFormik } from "formik";
import { CircleNotch } from "phosphor-react";

import { ChangeEvent, useRef } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "@app/libs/Api";
import { useModal } from "@app/providers/modal";

type Props = {
  onChange: (data: any) => void;
};

function Prepare({ onChange }: Props) {
  const { aula_id = "" } = useParams();

  const { openModal } = useModal()

  const mutation = useMutation(async ({ texto }: any) => {
    const data = new Blob([texto], { type: "text/plain" });
    const file = new File([data], "texto");

    const formData = new FormData();

    formData.append("file", file);
    formData.append("aula_id", aula_id);

    const { data: _data } = await Api.post(`questoes/prepare`, formData);

    if(_data?.error) {
      console.log(toast)
      toast.error(_data?.message || 'Arquivo Inválido')
    } else {
      setValues({ texto: "" });
      onChange(_data);
    }
  });

  const { handleSubmit, handleChange, values, setValues } = useFormik({
    initialValues: {
      texto: "",
    },
    onSubmit: () => {
      mutation.mutate(values);
    },
  });

  const inputFileRef = useRef<HTMLInputElement>(null);
  function handleChangeFile(ev: ChangeEvent<HTMLInputElement>) {
    const files = ev.target.files;
    const read = new FileReader();

    read.onload = () => {
      setValues({
        texto: `${read.result}`,
      });
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
      <div className="p-5 border-t flex gap-4">
        <button
          type="button"
          onClick={() => inputFileRef?.current?.click()}
          className="text-primary-500 font-bold uppercase text-base"
        >
          Importar arquivo
        </button>
        <button
          type="button"
          onClick={() => openModal('/qconcursos')}
          className="text-primary-500 font-bold uppercase text-base hidden"
        >
          Qconcursos
        </button>
        <div className="flex-1"></div>
        <button
          disabled={values.texto === "" || mutation.isLoading}
          type="submit"
          className="text-primary-500 flex items-center gap-2 disabled:opacity-25 font-bold uppercase text-base"
        >
        {mutation.isLoading && <CircleNotch className="animate-spin" />  }  <span> Preparar questões</span>
        </button>
      </div>
    </form>
  );
}

export default Prepare;
