import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetch(buildApiUrl('users'))
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load users')
        }

        return response.json()
      })
      .then((payload) => {
        if (!ignore) {
          setUsers(normalizeCollection(payload))
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
    return <p className="status-text">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="status-text text-danger">Users are unavailable.</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h2>Active members</h2>
      </div>
      <div className="row g-3">
        {users.map((user) => (
          <article className="col-md-6 col-xl-4" key={user._id}>
            <div className="data-card h-100">
              <h3>{user.displayName}</h3>
              <p>{user.email}</p>
              <span className="badge text-bg-success text-capitalize">{user.fitnessLevel}</span>
              <strong>{user.weeklyGoalMinutes} weekly goal minutes</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users