import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetch(buildApiUrl('workouts'))
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load workouts')
        }

        return response.json()
      })
      .then((payload) => {
        if (!ignore) {
          setWorkouts(normalizeCollection(payload))
          setStatus('ready')
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus('error')
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  if (status === 'loading') {
    return <p className="status-text">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="status-text text-danger">Workouts are unavailable.</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Workouts</p>
        <h2>Suggested sessions</h2>
      </div>
      <div className="row g-3">
        {workouts.map((workout) => (
          <article className="col-md-6 col-xl-4" key={workout._id}>
            <div className="data-card h-100">
              <h3>{workout.title}</h3>
              <p>{workout.focusArea}</p>
              <span className="badge text-bg-dark text-capitalize">{workout.difficulty}</span>
              <strong>{workout.durationMinutes} minutes</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts