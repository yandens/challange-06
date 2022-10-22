const request = require('supertest')
const app = require('../index')
const truncate = require('../helpers/truncate')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = process.env

const userTest = {
  name: 'deden',
  username: 'deden123',
  password: 'deden123',
  email: 'deden@gmail.com',
  phone: '085123456789'
}

const haveProperty = (res) => {
  expect(res.body).toHaveProperty('status')
  expect(res.body).toHaveProperty('message')
  expect(res.body).toHaveProperty('data')
}

const successRes = (res, code, status, message, data) => {
  expect(res.statusCode).toBe(code)
  expect(res.body.status).toBe(status)
  expect(res.body.message).toBe(message)
  expect(res.body.data).toStrictEqual(data)
}

const failedRes = (res, code, status, message, data) => {
  expect(res.statusCode).toBe(code)
  expect(res.body.status).toBe(status)
  expect(res.body.message).toBe(message)
  expect(res.body.data).toBe(data)
}

let token
truncate.user()
truncate.userBiodata()
truncate.userHistory()

describe('/auth/register endpoint', () => {
  // register success
  test('register success', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(userTest);

    haveProperty(res)
    successRes(res, 201, true, 'success create new user', {
      name: userTest.name,
      username: userTest.username,
      email: userTest.email
    })
  })

  // register failed
  test('register failed', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(userTest)

    haveProperty(res)
    failedRes(res, 400, false, 'username already exist', null)
  })
})

describe('/auth/login endpoint', () => {
  // login success
  test('login success', async () => {
    const res = await request(app).post('/auth/login')
      .send({ username: userTest.username, password: userTest.password })

    const payload = {
      id: 1,
    }

    const testToken = jwt.sign(payload, JWT_KEY)

    haveProperty(res)
    successRes(res, 200, true, 'login success', testToken)
    token = testToken
  })

  // login failed
  test('login failed', async () => {
    const res = await request(app).post('/auth/login')
      .send({ username: userTest.username, password: `${userTest.password}4` })

    haveProperty(res)
    failedRes(res, 404, false, 'username or password not correct', null)
  })

  test('already register?', async () => {
    const res = await request(app).post('/auth/login')
      .send({ username: `${userTest.username}1`, password: userTest.password })

    haveProperty(res)
    failedRes(res, 404, false, 'do you already register?', null)
  })
})

describe('/auth/logout endpoint', () => {
  // logout success
  test('logout success', async () => {
    const res = await request(app).post('/auth/logout')
      .set('Authorization', token)

    const decode = jwt.verify(token, JWT_KEY)
    const testToken = jwt.sign(decode, ' ', { expiresIn: 1 })
    haveProperty(res)
    successRes(res, 200, true, 'logout success', testToken)
  })
})

describe('/auth/changePass endpoint', () => {
  // change password failed
  test('change password failed', async () => {
    const res = await request(app).put('/auth/changePass')
      .set('Authorization', token)
      .send({
        oldPass: 'deden',
        newPass: 'deden',
        confirmNewPass: 'deden'
      })

    haveProperty(res)
    failedRes(res, 401, false, 'password not match', null)
  })

  test('change password success', async () => {
    const res = await request(app).put('/auth/changePass')
      .set('Authorization', token)
      .send({
        oldPass: 'deden123',
        newPass: 'deden',
        confirmNewPass: 'deden'
      })

    const decode = jwt.verify(token, JWT_KEY)
    const user = decode
    haveProperty(res)
    successRes(res, 201, true, 'success change password', { id: user.id })
  })

  /*test('token invalid', async () => {
    const res = await request(app).put('/auth/changePass')
      .set({ 'Authorization': `${token}s` })
      .send({
        oldPass: 'deden',
        newPass: 'deden123',
        confirmNewPass: 'deden123'
      })

    haveProperty(res)
    failedRes(res, 401, false, 'u re not authorized!', null)
  })*/
})
