import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'   // default export assumed
import MainLayout from './layout/MainLayout'
import NoteDetailPage from './pages/NoteDetailPage'
import AddNotePage from './pages/AddNotePage'
import EditNotePage from './pages/EditNotePage'
import { useEffect, useState } from 'react'
import axios from "axios"


const App = () => {

  const[notes,setNotes] = useState([])

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/notes/") //return a promise
    .then(res=>{
      console.log(res.data)
    })

  })

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
      <Route index element={<HomePage />} />
      <Route path="/add-note" element={<AddNotePage />} />
      <Route path="/edit-note" element={<EditNotePage/>}/>
      <Route path="/note-detail" element={<NoteDetailPage/>}/>
      
      </Route>
      
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
