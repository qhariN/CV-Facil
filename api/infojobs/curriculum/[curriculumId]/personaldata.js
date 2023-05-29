import wretch from 'wretch'
import { allowCors } from '../../../../src/middlewares/cors'

const clientId = process.env.CLIENT_ID ?? ''
const clientSecret = process.env.CLIENT_SECRET ?? ''

async function handler (req, res) {
  const bearer = req.headers.authorization
  const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const { curriculumId } = req.query

  if (req.method === 'GET') {
    const request = wretch(`https://api.infojobs.net/api/2/curriculum/${curriculumId}/personaldata`)
      .accept('application/json')
      .auth(`Basic ${base64Credentials}, ${bearer}`)
      .get()
    const data = await request.json()
    return res.json(data)
  }

  if (req.method === 'PUT') {
    const request = wretch(`https://api.infojobs.net/api/3/curriculum/${curriculumId}/personaldata`)
      .accept('application/json')
      .auth(`Basic ${base64Credentials}, ${bearer}`)
      .put(req.body)
    await request.json()
    return res.json()
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

export default allowCors(handler)
