import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, } from 'react-router'
import { Link } from 'react-router-dom'

const Readme = ({ navigate, setRepositories }) => {
  const [readError, setReadError] = useState(false)
  const [readmeData, setReadmeData] = useState(null)
  const [readme, setReadme] = useState([])
  const { userName } = useParams('userName')
  const { repositoryName } = useParams('repositoryName')
  const backHandler = (e) => {
    e.preventDefault()
    setRepositories(null)
    navigate('/')
  }
  useEffect(() => {
    axios(`https://api.github.com/repos/${userName}/${repositoryName}/readme`)
      .then(({ data }) => {
        setReadmeData(data)
        setReadError(false)
      })
      .catch((e) => {
        console.log(e)
        setReadError(true)
        setReadmeData(null)
      }
      )
  }, [userName])
  useEffect(() => {
    if (readmeData) {
      const README_URL = readmeData?.download_url
      axios(README_URL)
        .then(({ data }) => setReadme(data.split('\n')))
        .catch((e) => console.log(e))
    }

  }, [readmeData])
  const removeFirstSymb = (arr) => {
    arr.splice(0,1)
    return arr.join(' ')
  }
  return (
    <div>
      {readError || !readmeData ?
        <>
          <button onClick={backHandler}>go Home</button>
          <Link to={`/${userName}`}>back</Link>
          <p>В данном проекте нет файла .README.md</p>
        </>
        :
        <div>
          <button onClick={backHandler}>go Home</button>
          <Link to={`/${userName}`}>back</Link>
          <h2>{readmeData.name}</h2>

          {
            readme && readme.map((read) => (
              
              read.includes('### ')
                ?
                <>
                <h4 style={{padding:'10px',background:'#cbcbcb70',borderRadius:'10px',display:'inline-block', color:'#4d4d4d'}}>{removeFirstSymb(read.split(' '))}</h4>
                </>
                :
                read.includes('## ')
                ?
                <>
                <h2>{removeFirstSymb(read.split(' '))}</h2>
                <hr />
                </>
                :
                read.includes('# ')
                ?
                <>
                <h1>{removeFirstSymb(read.split(' '))}</h1>
                <hr />
                </>
                :
                <div>{read}</div>
            )
            )	
          }
        </div>
      }
    </div>
  )
}

export default Readme