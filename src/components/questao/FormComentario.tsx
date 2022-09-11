import { useFormik } from "formik";
import { CheckCircle, Spinner, SpinnerGap } from "phosphor-react";
import { MdCheck } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";
import useCodemirror from "../../hooks/codemirror-hook";
import Api from "../../libs/Api";
import MarkdownEditor from "../mardown-editor";

type Props = {
  questao_id: number;
};

export default function FormComentario({ questao_id }: Props) {
  const queryClient = useQueryClient();
  const { handleSubmit, handleChange, values, resetForm, setFieldValue } = useFormik({
    initialValues: {
      texto: "",
    },
    onSubmit: (values: any) => {
      mutate(values);
    },
  });

  const { mutate, isLoading } = useMutation(
    async (values) => {
      const { data } = await Api.post(
        `questoes/${questao_id}/comentarios`,
        values
      );

      return data;
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(['comentarios', questao_id])
        resetForm();
      },
    }
  );



  return (
    <form
      onSubmit={handleSubmit}
      className="border-t flex flex-col p-0 justify-end relative"
    >
      <div className="p-5 min-h-[150px]">
        <MarkdownEditor value={values.texto} onChange={(ev) => setFieldValue('texto', ev)} />

      </div>
      <button
        type="submit"
        disabled={isLoading || values.texto.length <= 2}
        className="absolute disabled:opacity-50 flex items-center bottom-5 right-5 gap-2 rounded-full bg-green-600 text-white h-10 px-5"
      >
        {isLoading ? <SpinnerGap className="animate-spin" /> : <CheckCircle />} Salvar
      </button>
    </form>
  );
}
