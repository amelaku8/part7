import { useState } from 'react'
import {  Routes,Route,Link,useMatch,useParams,useNavigate} from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='/' style={padding}>anecdotes</a>
      <a href='/create' style={padding}>create new</a>
      <a href='/about' style={padding}>about</a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  return (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)
const CreateNew = (props) => {
  const content = useField("content")
  const author = useField("author")
  const info  = useField ("info")
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,

      author: author.value,
      info:  info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()

    const values= {target:{value:""}}
    content.onChange(values)
    
    info.onChange(values)
    author.onChange(values)

  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content}/> 
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick = {handleReset}> reset </button>

      </form>
    </div>
  )

}
const Anecdote = ({anecdote}) => {

    return (
<div>
   <h2> {anecdote.author} </h2>
    <p> {anecdote.content} </p>
   <p> votes : {anecdote.votes} </p>
    <p> {anecdote.info} </p>

</div>

)
}
const Notification =  ({notification}) => {
  return (
    <p> {notification} </p>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const match = useMatch("/anecdotes/:id")

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new ancedote '${anecdote.content}' created!`)
    setTimeout(() => setNotification(""),5000)
  }


  const anecdoteById = () =>{
if (match){
    return anecdotes.find(anecdote => anecdote.id == match.params.id)
    }
  }

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
    <Notification notification = {notification}/>
        <Routes>
      <Route path = "/" element = {<AnecdoteList anecdotes={anecdotes} />}/> 
      <Route path = "/about" element = {<About />} />
      <Route path = "/create" element  = {<CreateNew addNew={addNew} />}/>
      <Route path = "/anecdotes/:id" element = {<Anecdote anecdote ={anecdoteById()} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
