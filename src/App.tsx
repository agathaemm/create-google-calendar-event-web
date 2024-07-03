import './App.css'
import { useGoogleCalendar } from './hooks/useGoogleCalendar'


function App() {
  const {handleCreateEvent} = useGoogleCalendar()

  return (
    <>
      <h1>POC Criar evento na agenda do Google</h1>
      <div className="card">
        <button onClick={handleCreateEvent}>criar evento</button>
      </div>
    </>
  )
}

export default App
