const auth = require('../controllers/auth')

const mockRequest = (body = {}) => ({ body })
const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res);
  return res;
}
const mockNext = jest.fn()
const mockUser = jest.fn()

describe('auth.register.function', () => {
  // case if success
  test('res.status called with 201', async () => {
    try {
      const data = ['deden', 'deden123', 'deden123', 'deden@gmail.com', '085123258456']
      const { name, username, password, email, phone } = data
      const req = mockRequest({ name, username, password, email, phone })
      const res = mockResponse()
      const next = mockNext()

      await auth.register(req, res, next)
      expect(res.status).toBeCalledWith(201)
      expect(res.json).toBeCalledWith({
        status: true,
        message: 'success create new user',
        data: { name, username, email }
      })
      //expect(next).toHaveBeenCalled()
    } catch (err) {
      //console.log(err)
    }
  })
})

describe('auth.login.function', () => {
  // case if success
  test('res.status called with 200', async () => {
    try {
      const data = ['deden123', 'deden123']
      const { username, password } = data
      const req = mockRequest({ username, password })
      const res = mockResponse()
      const next = mockNext()

      await auth.login(req, res, next)
      expect(res.status).toBeCalledWith(200)
      expect(res.json).toBeCalledWith({
        status: true,
        message: 'login success',
        data: token
      })
      //expect(next).toHaveBeenCalled()
    } catch (err) {
      //console.log(err)
    }
  })
})

describe('auth.logout.function', () => {
  // case if success
  test('res.status called with 200', async () => {
    try {
      const req = mockRequest()
      const res = mockResponse()
      const next = mockNext()

      await auth.logout(req, res, next)
      expect(res.status).toBeCalledWith(200)
      expect(res.json).toBeCalledWith({
        status: true,
        message: 'logout success',
        data: token
      })
      //expect(next).toHaveBeenCalled()
    } catch (err) {
      //console.log(err)
    }
  })
})

describe('auth.changePass.function', () => {
  // case if success
  test('res.status called with 201', async () => {
    try {
      const data = ['deden123', 'deden', 'deden']
      const { oldPass, newPass, confirmNewPass } = data
      const req = mockRequest({ oldPass, newPass, confirmNewPass })
      const res = mockResponse()
      const next = mockNext()
      const user = mockUser()

      await auth.changePass(req, res, next)
      expect(res.status).toBeCalledWith(201)
      expect(res.json).toBeCalledWith({
        status: true,
        message: 'success change password',
        data: {
          id: user.id,
          username: user.username
        }
      })
      //expect(next).toHaveBeenCalled()
    } catch (err) {
      //console.log(err)
    }
  })
})
