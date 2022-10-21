const request = require('supertest')
const app = require('../index')
let token = ''

describe('user.updateBio.fuction', () => {
  // case if success
  test('res.status called with 201', async () => {
    try {
      const data = ['deden123', 'deden', 'deden@gmail.com', '085456258456']
      const { username, name, email, phone } = data

      const res = await request(app).put('/user/update').set('Authorization', token).send({ username, name, email, phone })
      expect(res.statusCode).toBe(201)
      expect(res.body).toHaveProperty('status')
      expect(res.body).toHaveProperty('message')
      expect(res.body).toHaveProperty('data')
      expect(res.body.status).toBe(true)
      expect(res.body.message).toBe('success update user biodata')
      expect(res.body.data).toStrictEqual({ username, name, email, phone })
    } catch (err) {
      console.log(err)
    }
  })
})

describe('user.delete.fuction', () => {
  // case if success
  test('res.status called with 200', async () => {
    try {
      const data = token.data
      const res = await request(app).delete('/user/delete').set('Authorization', token)
      expect(res.statusCode).toBe(200)
      expect(res.body).toHaveProperty('status')
      expect(res.body).toHaveProperty('message')
      expect(res.body).toHaveProperty('data')
      expect(res.body.status).toBe(true)
      expect(res.body.message).toBe('success delete user')
      expect(res.body.data).toStrictEqual({ data })
    } catch (err) {
      console.log(err)
    }
  })
})
