import { useFormik } from 'formik'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Button from '../../components/button'
import Loading from '../../components/loading'
import PageLoading from '../../components/page-loading'
import Api from '../../libs/Api'
import { useModal } from '../../providers/modal'

export default function FormAula() {
  const { closeModal } = useModal()
  const params = useParams()



  const { handleSubmit, handleChange, values, setValues } = useFormik({
    initialValues: {
      ordem: '',
      name: ''
    },
    onSubmit: () => {
      mutate()
    }
  })

  const { isLoading } = useQuery(['aula', params?.aula_id], async () => {
    const { data } = await Api.get(`aulas/${params?.aula_id}`);
    setValues({
      ordem: data.ordem,
      name: data.name      
    })
  }, {
    enabled: !!params.aula_id
  })

  const { mutate, isLoading: loadingSave } = useMutation(async () => {

    const method = !!params.aula_id ? 'put' : 'post'
    const url = !!params.aula_id ? `aulas/${params.aula_id}` : `aulas`

    try {
      const { data } = await Api[method](url, {...values, 
        disciplina_id: params.disciplina_id,
        concurso_id: 1
      })

      closeModal(data)


    } catch (error) {

    }
  })


  return (
    <form onSubmit={handleSubmit} className='flex flex-col text-base gap-4 relative'>
      <PageLoading show={isLoading} />
      <div className='px-4 h-14 border-b flex items-center uppercase text-gray-700'>
        <h1>Cadastrar Aula</h1>
      </div>
      <div className='flex flex-col px-4'>
        <label htmlFor="">Ordem:</label>
        <input name='ordem' value={values.ordem} onChange={handleChange} type="number" className='border h-10 px-4 rounded' placeholder='Nome da disciplina' />
      </div>
      <div className='flex flex-col px-4'>
        <label htmlFor="">Nome:</label>
        <input name='name' value={values.name} onChange={handleChange} type="text" className='border h-10 px-4 rounded' placeholder='Nome da disciplina' />
      </div>

      <div className='flex-1'>
        {/* <code>{JSON.stringify(params)}</code> */}
      </div>
      <div className='flex p-4'>
        <Button type='submit' isLoading={loadingSave} >Salvar</Button>
      </div>
    </form>
  )
}
