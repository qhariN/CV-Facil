import wretch from 'wretch'
import { allowCors } from '../../../../src/middlewares/cors'

const clientId = process.env.CLIENT_ID ?? ''
const clientSecret = process.env.CLIENT_SECRET ?? ''

async function handler (req, res) {
  const bearer = req.headers.authorization
  const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const { curriculumId } = req.query
  const endpoint = `https://api.infojobs.net/api/1/curriculum/${curriculumId}/cvtext`
  const requestConfiguration = wretch(endpoint)
    .accept('application/json')
    .auth(`Basic ${base64Credentials}, ${bearer}`)

  if (req.method === 'GET') {
    const request = requestConfiguration.get()
    const data = await request.json()
    return res.json(data)
  }

  if (req.method === 'PUT') {
    const request = requestConfiguration.put(req.body)
    await request.json()
    return res.json()
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

export default allowCors(handler)
