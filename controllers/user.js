const { User, UserBiodata, UserHistory } = require('../models')

const updateBio = async (req, res, next) => {
  try {
    const { username, name, email, phone } = req.body
    const user = req.user

    const updateUser = await User.update({ username: username }, { where: { id: user.id } })
    const updateUserBio = await UserBiodata.update(
      {
        name: name,
        email: email,
        phone: phone
      },
      { where: { id: user.id } }
    )

    return res.status(201).json({
      status: true,
      message: 'succes update user biodata',
      data: {
        username,
        name,
        email,
        phone
      }
    })
  } catch (err) {
    //console.log(err)
    next(err)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const user = req.user

    const delUserHistory = await UserHistory.destroy({ where: { user_id: user.id } })
    const delUserBiodata = await UserBiodata.destroy({ where: { user_id: user.id } })
    const deleteUser = await User.destroy({ where: { id: user.id } })

    return res.status(200).json({
      status: true,
      message: 'success delete user',
      data: user
    })
  } catch (err) {
    //console.log(err)
    next(err)
  }
}

module.exports = { updateBio, deleteUser }
