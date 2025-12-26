export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (body.email === 'admin@veriplay.com' && body.password === '123456') {
    return {
      token: 'fake-jwt-token-veriplay',
      user: { email: body.email, name: 'Admin Test' }
    }
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Credenciales inválidas'
  })
})