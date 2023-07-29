import axios from 'axios'
import { useState } from 'react'
const Form = ({ repositories, setRepositories, userName, setUserName,navigate }) => {
  const [userSearchError, setUserSearchError] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    axios(`https://api.github.com/users/${userName}/repos`)
      .then(({ data }) => {
        if (data.length !== 0) {
          setRepositories(data)
          setUserSearchError(false)
          navigate(`/${userName}`)
        } else {
          setRepositories(null)
          setUserSearchError(true)
        }
      })
      .catch((e) => console.log(e))
  }
  
  return (
    <div>
      {!repositories &&
        <form onSubmit={submitHandler}>
          <input type="text" placeholder='Введите username...' onChange={(e) => { setUserName(e.target.value) }} />
          <button type='submit'>Search</button>
          {userSearchError && (<p style={{color:'red'}}>Пользователь не найден</p>)}
        </form>
        
      }

    </div>
  )
}

export default Form