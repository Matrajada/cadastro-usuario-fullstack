import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/red-trash-can-icon.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([])

  const inputname = useRef()
  const inputage = useRef()
  const inputemail = useRef()
  const [errorMessage, setErrorMessage] = useState('O E-mail já está em uso')


  async function getUsers() {
    const usersFromApi = await api.get('/users')
    setUsers(usersFromApi.data)
  }

  function showUserId(id) {
    alert(`Seu ID é: ${id}`);
  }

  async function editUser(user) {
    const newName = prompt("Digite o novo nome:", user.data?.name)
    const newAge = prompt("Digite a nova idade:", user.data?.age)

    // Se o usuário cancelou qualquer um dos prompts, interrompe
    if (newName === null || newAge === null) return

    // Validação: verifica se a idade contém apenas números
    if (isNaN(newAge) || newAge.trim() === '') // .trim() em JavaScript remove os espaços em branco extras do início e do final de uma string, sem alterar o conteúdo do meio.//
    {
      alert("Por favor, insira apenas números no campo de idade.")
      return
    }

    try {
      await api.put(`/users/${user._id}`, {
        name: newName,
        age: newAge,
        email: user.data?.email // Preserva o e-mail atual do usuário
      })

      getUsers()
      alert("Usuário atualizado com sucesso!")
    } catch (error) {
      alert("Erro ao atualizar o usuário.")
    }
  }


  async function createUsers() {
    const emailValue = inputemail.current.value

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(emailValue)) {
      setErrorMessage("Por favor, insira um e-mail válido. EX: usuario@email.com ")
      return
    }
    try {
      await api.post('/users', {
        name: inputname.current.value,
        age: inputage.current.value,
        email: emailValue

      })

      setErrorMessage('')

      inputname.current.value = ''
      inputage.current.value = ''
      inputemail.current.value = ''
      getUsers()

      // Feedback de sucesso ao cadastrar
      alert("Usuário cadastrado com sucesso!")
    } catch (error) {

      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error)
      }
      else {
        setErrorMessage('Erro ao cadastrar usuário.')
      }
    }
  }
  async function deleteUsers(_id) {
    //confirmação:
    const confirmDelete = window.confirm("Tem certeza que quer excluir esse usuário?")
    if (!confirmDelete) return

    try {
      await api.delete(`/users/${_id}`)
      getUsers()

      alert("Usuário excluído com sucesso!")
    } catch (error) {
      alert("Erro ao tentar excluir usuário.")
    }
  }


  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form onSubmit={(e) => { e.preventDefault(); createUsers(); }}>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name='nome' type='text' ref={inputname} required />
        <input placeholder='Idade (apenas números)' name='idade' type='number' ref={inputage} required />
        <input placeholder='Email' name='email' type='email' ref={inputemail} required />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type='submit'>Cadastre-se</button>
      </form>

      {users.map(user => (
        <div className='card' key={user._id}>
          {/* Div 1: Dados do usuário + Ver ID */}
          <div>
            <p>Nome: <span>{user.data?.name}</span></p>
            <p>Idade: <span>{user.data?.age}</span></p>
            <p>Email: <span>{user.data?.email}</span></p>
            <button className='mostrar-id' type='button' onClick={() => showUserId(user._id)}>
              Ver ID
            </button>
          </div>

          {/* Div 2: Lixeira em cima, Editar embaixo */}
          <div className='actions-container'>
            <button type='button' className='delete-btn' onClick={() => deleteUsers(user._id)}>
              <img src={Trash} alt="Deletar" />
            </button>
            <button type='button' className='editar-btn' onClick={() => editUser(user)}>
              Editar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home 