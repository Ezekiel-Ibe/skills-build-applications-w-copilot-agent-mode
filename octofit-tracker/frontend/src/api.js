export function buildApiUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

  return `${baseUrl}/api/${resource}/`
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  const collection = payload?.data ?? payload?.results ?? payload?.items ?? payload?.docs

  return Array.isArray(collection) ? collection : []
}