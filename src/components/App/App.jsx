import React, {useState} from 'react'
import { Route, Routes, useNavigate } from 'react-router'
import Form from '../Form'
import RepositoryList from '../RopositoryList'
import Readme from '../Readme'

const App = () => {
  const [repositories, setRepositories] = useState(null)
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  return (
    <div>
        <Routes>
            <Route path='/' element={<Form repositories={repositories} setRepositories={setRepositories} userName={userName} setUserName={setUserName} navigate={navigate}/>}/>
            <Route path='/:userName' element={<RepositoryList repositories={repositories} setRepositories={setRepositories} userName={userName} setUserName={setUserName} navigate={navigate}/>}/>
            <Route path='/:userName/:repositoryName' element={<Readme navigate={navigate} setRepositories={setRepositories}/>}/>
        </Routes>
    </div>
  )
}

export default App