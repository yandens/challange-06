const request = require('supertest')
const app = require('../index')
let token = ''

describe('auth.register.function', () => {
  // case if success
  test('res.status called with 201', async () => {
    try {
      const data = ['deden', 'deden123', 'deden123', 'deden@gmail.com', '085123258456']
      const { name, username, password, email, phone } = data

      const res = await request(app).post('/auth/register').send({ name, username, password, email, phone })
      expect(res.statusCode).toBe(201)
      expect(res.body).toHaveProperty('status')
      expext(res.body).toHaveProperty('message')
      expect(res.body).toHaveProperty('data')
      expect(res.body.status).toBe(true)
      expect(res.body.message).toBe('success create new user')
      expect(res.body.data).toStrictEqual({ name, username, email })
    } catch (err) {
      console.log(err)
    }
  })
})

describe('auth.login.function', () => {
  // case if success
  test('res.status called with 200', async () => {
    try {
      const data = ['deden123', 'deden123']
      const { username, password } = data

      const res = await request(app).post('/auth/login').send({ username, password })
      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('status')
      expect(res.body).toHaveProperty('message')
      expect(res.body).toHaveProperty('data')
      expect(res.body.status).toBe(true)
      expect(res.body.message).toBe('login success')
      expect(res.body.data).toStrictEqual({ token })
    } catch (err) {
      console.log(err)
    }
  })
})

describe('auth.logout.function', () => {
  // case if success
  test('res.status called with 200', async () => {
    try {
      const res = await request(app).post('/auth/logout').set('Authorization', token)
      expect(res, statusCode).toBe(200)
      expect(res.body).toHaveProperty('status')
      expect(res.body).toHaveProperty('message')
      expect(res.body).toHaveProperty('data')
      expect(res.body.status).toBe(true)
      expect(res.body.message).toBe('logout success')
      expect(res.body.data).toStrictEqual({ token })
    } catch (err) {
      console.log(err)
    }
  })
})

describe('auth.changePass.function', () => {
  // case if success
  test('res.status called with 201', async () => {
    try {
      const data = ['deden123', 'deden', 'deden']
      const { oldPass, newPass, confirmNewPass } = data

      const res = await request(app).post('/auth/changePass').set('Authorization', token).send({ oldPass, newPass, confirmNewPass })
      expect(res.statusCode).toBe(201)
      expect(res.body).toHaveProperty('status')
      expect(res.body).toHaveProperty('message')
      expect(res.body).toHaveProperty('data')
      expect(res.body.status).toBe(true)
      expect(res.body.message).toBe('success change password')
      expect(res.body.data).toStrictEqual({ id: token.data.id, username: token.data.username })
    } catch (err) {
      console.log(err)
    }
  })
})
