import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'   // default export assumed
import MainLayout from './layout/MainLayout'
import NoteDetailPage from './pages/NoteDetailPage'
import AddNotePage from './pages/AddNotePage'
import EditNotePage from './pages/EditNotePage'
import { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'


const App = () => {

  const[notes,setNotes] = useState([])
  const[isLoading, setIsLoading] =useState(false)
  const [filterText, setFilterText] = useState("")


  const handleFilterText = (val)=>{
    setFilterText(val)
  }
  const filterNotes = filterText === "BUSINESS"
  ?notes.filter(note=>note.category == "BUSINESS")
  :filterText === "PERSONLA"? notes.filter(note=>note.category == "PERSONLA")
  :filterText === "IMPORTANT"? notes.filter(note=>note.category == "IMPORTANT"):
  notes


  useEffect(()=>{
    setIsLoading(true)
    axios.get("http://127.0.0.1:8000/notes/") //return a promise
    .then(res=>{
      console.log(res.data)
      setNotes(res.data)
      setIsLoading(false)
    })
    .catch(err =>{
      console.log(err.message)
    })

  },[])// you put the [](array) to make the useeffect run just one time, other wise it is gonna run multiple times

  const addNote = (data)=>{
    axios.post("http://127.0.0.1:8000/notes/", data)
    .then(res =>{
      setNotes([...notes, res.data])
      toast.success("new note added successfully")
      console.log(res.data)
    })
    .catch(err=>{
      console.log(err.message)
    })
  }
   const updateNote = (data, slug)=>{
    axios.put(`http://127.0.0.1:8000/notes/${slug}/`, data)
    .then(res=>{
      console.log(res.data)
       setNotes(prevNotes =>
        prevNotes.map(note => 
          note.slug === slug ? res.data : note
        )
      )
      toast.success("Note updated well")
    })
    .catch(err=>{
      console.log(err.message)
    })
  }

  const deleteNote = (slug)=>{
    axios.delete(`http://127.0.0.1:8000/notes/${slug}/`)
    .then(res=>{
      setNotes([...notes])
    })
    .catch(err=>{
      console.log(err.message)
    })
  }



  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
      <Route index element={<HomePage 
      notes={filterNotes} loading = {isLoading}  handleFilterText={ handleFilterText}/>} />
      <Route path="/add-note" element={<AddNotePage addNote={addNote} />} />
      <Route path="/edit-note/:slug" element={<EditNotePage updateNote={updateNote}/> }/>
      <Route path="/notes/:slug" element={<NoteDetailPage deleteNote={deleteNote}/>}/>
      
      </Route>
      
    )
  )

 

  return (
    <RouterProvider router={router} />
  )
}

export default App
