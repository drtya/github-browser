import React from 'react'
import { Link } from 'react-router-dom'

const RepositoryList = ({ repositories, setRepositories, userName, setUserName, navigate }) => {

  const backHandler = (e) => {
    e.preventDefault()
    setRepositories(null)
    navigate('/')
  }
  return (

    <div>
      <button onClick={backHandler}>go Home</button>
      <h1>{userName}</h1>
      {
        repositories && repositories.map(repo => (
          <Link key={repo.id} to={`/${userName}/${repo.name}`} style={{ display: 'block', color: 'black', textDecoration: 'none', margin: '8px 0' }}>{repo.name}</Link>
        ))
      }

    </div>
  )
}

export default RepositoryList