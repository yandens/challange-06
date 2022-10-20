const { User, UserBiodata, UserHistory } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = process.env

const register = async (req, res, next) => {
  try {
    const { name, username, password, email, phone } = req.body

    const existUser = await User.findOne({ where: { username } })

    if (existUser) {
      return res.status(500).json({
        status: false,
        message: 'username already exits'
      })
    }

    const encryptedPass = await bcrypt.hash(password, 10)

    const user = await User.create({
      username,
      password: encryptedPass
    })

    const userBiodata = await UserBiodata.create({
      user_id: user.id,
      name,
      email,
      phone
    })

    return res.status(201).json({
      status: true,
      message: 'success create new user',
      data: {
        name: userBiodata.name,
        username: user.username,
        email: userBiodata.email
      }
    })
  } catch (err) {
    //console.log(err)
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const findUser = await User.findOne({ where: { username } })
    const correct = await bcrypt.compare(password, findUser.password)

    if (!findUser || !correct) {
      return res.status(404).json({
        status: false,
        message: 'username or password not correct'
      })
    }

    let date = new Date()

    const timeLogin = await UserHistory.create({
      user_id: findUser.id,
      time_login: date,
      time_logout: null
    })

    // JWT_KEY
    const payload = {
      id: findUser.id,
      username: findUser.username
    }
    const token = jwt.sign(payload, JWT_KEY)

    return res.status(200).json({
      status: true,
      message: 'login success',
      data: token
    })
  } catch (err) {
    if (err.message == "Cannot read properties of null (reading 'password')") {
      return res.status(404).json({
        status: false,
        message: 'do you already register?',
        data: null
      })
    }
    //console.log(err)
    next(err)
  }
}

const logout = async (req, res, next) => {
  try {
    const user = req.user
    let date = new Date()

    const time_logout = await UserHistory.update(
      { time_logout: date },
      { where: { user_id: user.id } }
    )

    const token = jwt.sign(user, " ", { expiresIn: 1 })

    return res.status(200).json({
      status: true,
      message: 'logout success',
      data: token
    })
  } catch (err) {
    //console.log(err)
    next(err)
  }
}

const changePass = async (req, res, next) => {
  try {
    const { oldPass, newPass, confirmNewPass } = req.body
    const user = req.user

    const findUser = await User.findOne({ where: { id: user.id } })
    const correct = await bcrypt.compare(oldPass, findUser.password)

    if (!correct || newPass !== confirmNewPass) {
      return res.status(401).json({
        status: false,
        message: 'password not match'
      })
    }

    /* if (newPass !== confirmNewPass) {
      res.status(401).json({
        status: false,
        message: 'not match'
      })
    } */

    const encryptedPass = await bcrypt.hash(newPass, 10)

    const changed = await User.update(
      { password: encryptedPass },
      { where: { id: user.id } }
    )

    return res.status(201).json({
      status: true,
      message: 'success change password',
      data: {
        id: user.id,
        username: user.username
      }
    })
  } catch (err) {
    //console.log(err)
    next(err)
  }
}

module.exports = { register, login, logout, changePass }
