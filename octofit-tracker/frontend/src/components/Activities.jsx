import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetch(buildApiUrl('activities'))
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load activities')
        }

        return response.json()
      })
      .then((payload) => {
        if (!ignore) {
          setActivities(normalizeCollection(payload))
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
    return <p className="status-text">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="status-text text-danger">Activities are unavailable.</p>
  }

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Activity Log</p>
        <h2>Recent movement</h2>
      </div>
      <div className="row g-3">
        {activities.map((activity) => (
          <article className="col-md-6 col-xl-4" key={activity._id}>
            <div className="data-card h-100">
              <h3>{activity.activityType}</h3>
              <p>{activity.notes}</p>
              <dl>
                <div>
                  <dt>Minutes</dt>
                  <dd>{activity.durationMinutes}</dd>
                </div>
                <div>
                  <dt>Calories</dt>
                  <dd>{activity.caloriesBurned}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Activities