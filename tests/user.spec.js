const users = require('../controllers/user')

const mockRequest = (body = {}) => ({ body })
const mockResponse = () => {
  const res = {}
  res.json = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  return res;
}
const mockNext = jest.fn()
const mockUser = jest.fn()

describe('user.updateBio.fuction', () => {
  // case if success
  test('res.status called with 201', async () => {
    try {
      const data = ['deden123', 'deden', 'deden@gmail.com', '085456258456']
      const { username, name, email, phone } = data
      const req = mockRequest({ username, name, email, phone })
      const res = mockResponse()
      const next = mockNext()
      const user = mockUser()

      await users.updateBio(req, res, next)
      expect(res.status).toBeCalledWith(201)
      expect(res.json).toBeCalledWith({
        status: true,
        message: 'success update user biodata',
        data: { username, name, email, phone }
      })
      //expect(next).toHaveBeenCalled()
    } catch (err) {
      //console.log(err)
    }
  })
})

describe('user.delete.fuction', () => {
  // case if success
  test('res.status called with 200', async () => {
    try {
      const req = mockRequest()
      const res = mockResponse()
      const next = mockNext()
      const user = mockUser()

      await users.deleteUser(req, res, next)
      expect(res.status).toBeCalledWith(200)
      expect(res.json).toBeCalledWith({
        status: true,
        message: 'success delete user',
        data: user
      })
    } catch (err) {
      //console.log(err)
    }
  })
})
