import { useEffect, useState } from 'react'
import logo from "../public/logo.png"

import './App.css'
import axios from 'axios'

function App() {

  const [personajes, setPersonaje] = useState([])
  const [buscar, setBuscar] = useState()
  const [favoritosPer, setFavoritosPer] = useState([])

  const db = async () => {
    const response = await axios("http://localhost:4000/favorites")
  }

  const dbFavorites = async (name, image) => {
    const response = await axios.post("http://localhost:4000/favorites/create", { name, image })

  }

  useEffect(() => {

    const data = async () => {
      const response = await axios("https://rickandmortyapi.com/api/character")
      setPersonaje(response.data.results)
    }

    const data2 = async () => {
      const response = await axios("http://localhost:4000/favorites")
      setFavoritosPer(response.data)
      console.log(response, "response");
    }

    data()
    data2()
    db()
      .then(res => console.log(res))


  }, [])

  const buscador = (ev) => {
    const value = ev.target.value
    setBuscar(value)
  }

  const favoritos = (personaje) => {
    console.log(personaje, "personaje");

    const id = favoritosPer.find((persona) => persona.id === personaje.id)

    console.log(id, "id");



    if (!id) {
      const res = dbFavorites(personaje.name, personaje.image)
        .then((res) => console.log(res))
      setFavoritosPer([...favoritosPer, personaje])
    } else {
      console.log("no se agrego");
    }


  }

  return (
    <div >

      <div className='favorite'>
        <img className='logo' src={logo} alt="imagen" />

        <div className='inputContainer'>
          <input type="text" name="" id="" placeholder='Write here...' value={buscar} onChange={buscador} className='input' />
          <button>Search</button>
        </div>

        <div className='favoriteContainer'>

          {
            favoritosPer.length
              ? favoritosPer.map((favoritoPer) => (
                <div className='favoriteCard' key={favoritoPer._id}>
                  <div>
                    <img className='imagen' src={favoritoPer.image} alt="imagen" />
                  </div>
                </div>
              ))
              : <p>no hay nada</p>
          }
        </div>
      </div>

      <div className='container'>
        {
          personajes.map((personaje) => (
            <div className='card' key={personaje.id} onClick={() => favoritos(personaje)}>

              <div>
                <img src={personaje.image} alt="imagen" />
              </div>

              <div className='texto'>

                <h1>
                  {personaje.name}
                </h1>


                <div className='info'>

                  <div className='gender'>
                    <p className=''>{personaje.gender}</p>
                    <div className='punto'></div>
                    <p>{personaje.species}</p>
                  </div>

                  <p className={personaje.status === "Alive" ? "status" : "muerto"}>{personaje.status}</p>
                </div>

              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default App
