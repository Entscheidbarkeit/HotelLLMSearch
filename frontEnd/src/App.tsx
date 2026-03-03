import { useState } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar.js'

function App() {

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hallo!</h1>
      <SearchBar/>
    </div>
  )
}

export default App
