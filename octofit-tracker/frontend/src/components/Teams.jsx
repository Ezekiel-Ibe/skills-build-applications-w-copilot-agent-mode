import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetch(buildApiUrl('teams'))
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load teams')
        }

        return response.json()
      })
      .then((payload) => {
        if (!ignore) {
          setTeams(normalizeCollection(payload))
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
    return <p className="status-text">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="status-text text-danger">Teams are unavailable.</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Teams</p>
        <h2>Shared goals</h2>
      </div>
      <div className="row g-3">
        {teams.map((team) => (
          <article className="col-md-6" key={team._id}>
            <div className="data-card h-100">
              <h3>{team.name}</h3>
              <p>{team.motto}</p>
              <strong>{team.weeklyGoalMinutes} weekly goal minutes</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams