import wretch from 'wretch'
import { allowCors } from '../../src/middlewares/cors'

const clientId = process.env.CLIENT_ID ?? ''
const clientSecret = process.env.CLIENT_SECRET ?? ''
const callbackUri = process.env.CALLBACK_URI ?? ''

async function handler (req, res) {
  const { code, state } = req.query

  const authParams = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: callbackUri,
    code
  })

  const data = wretch(`https://www.infojobs.net/oauth/authorize?${authParams}`)
    .content('application/x-www-form-urlencoded')
    .accept('application/json')
    .get()

  const token = await data.json()
  const params = new URLSearchParams({
    ...token,
    action: state
  })

  let path = ''
  if (state === 'import') {
    path = 'import-cv'
  } else if (state === 'export') {
    path = 'export-cv'
  }

  return res.redirect(`/#/${path}?${params}`)
}

export default allowCors(handler)
