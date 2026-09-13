import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetch(buildApiUrl('leaderboard'))
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load leaderboard')
        }

        return response.json()
      })
      .then((payload) => {
        if (!ignore) {
          setEntries(normalizeCollection(payload))
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
    return <p className="status-text">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="status-text text-danger">Leaderboard is unavailable.</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Leaderboard</p>
        <h2>Weekly rankings</h2>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Points</th>
              <th>Weekly Minutes</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id}>
                <td>#{entry.rank}</td>
                <td>{entry.points}</td>
                <td>{entry.weeklyMinutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard