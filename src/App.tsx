import './App.css'
import { useGoogleCalendar } from './hooks/useGoogleCalendar'


function App() {
  const {handleCreateEvent, handleRemoveEvent, eventsList} = useGoogleCalendar()

  return (
    <>
      <h1>POC Criar evento na agenda do Google</h1>
      <div className="card">
        <button onClick={handleCreateEvent}>Criar evento</button>
      </div>

      <h3>Meus eventos</h3>
      {eventsList?.map((event) => (
        <div key={event.id} style={{display: 'flex', gap: 10, alignItems: 'center'}}>
          <p>{event.start.dateTime || event.start.date} - {event.summary}</p>
          <button style={{height: 40}} onClick={() => handleRemoveEvent(event.id)}>Apagar</button>
      </div>
      ))}
    </>
  )
}

export default App
