import { useFormik } from "formik";
import { CheckCircle, Spinner, SpinnerGap } from "phosphor-react";
import { MdCheck } from "react-icons/md";
import { VscLoading } from "react-icons/vsc";
import { useMutation, useQueryClient } from "react-query";
import Api from "../../libs/Api";

type Props = {
  questao_id: number;
};

export default function FormComentario({ questao_id }: Props) {
  const queryClient = useQueryClient();
  const { handleSubmit, handleChange, values, resetForm } = useFormik({
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
      <textarea
        placeholder="Novo comentário"
        className="w-full resize-none p-5 rounded focus:outline-none z-0"
        name="texto"
        value={values.texto}
        onChange={handleChange}
      ></textarea>
      <button
        type="submit"
        disabled={isLoading || values.texto.length <= 2}
        className="absolute disabled:opacity-50 flex items-center bottom-5 right-5 gap-2 rounded-full bg-green-600 text-white h-10 px-5"
      >
        {isLoading ? <SpinnerGap className="animate-spin"  /> : <CheckCircle />} Salvar
      </button>
    </form>
  );
}
