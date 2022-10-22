const request = require('supertest')
const app = require('../index')
const truncate = require('../helpers/truncate')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = process.env

const userTest = {
  name: 'deden',
  username: 'deden',
  password: 'deden',
  email: 'deden123@gmail.com',
  phone: '085123456852'
}

const payload = {
  id: 1,
}

const testToken = jwt.sign(payload, JWT_KEY)
let token = testToken

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
}

truncate.user()
truncate.userBiodata()
truncate.userHistory()

describe('/user/update endpoint', () => {
  // update success
  test('update success', async () => {
    const res = await request(app).put('/user/update')
      .set('Authorization', token)
      .send(userTest)

    haveProperty(res)
    successRes(res, 201, true, 'success update user biodata', {
      username: userTest.username,
      name: userTest.name,
      email: userTest.email,
      phone: userTest.phone
    })
  })
})

describe('/user/delete endpoint', () => {
  // delete success
  test('delete success', async () => {
    const res = await request(app).delete('/user/delete')
      .set('Authorization', token)

    const decode = jwt.verify(token, JWT_KEY)
    const user = decode
    haveProperty(res)
    successRes(res, 200, true, 'success delete user', user)
  })
})
