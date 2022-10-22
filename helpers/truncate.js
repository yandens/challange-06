const { User, UserBiodata, UserHistory } = require('../models')

module.exports = {
  user: async () => {
    await User.destroy({ truncate: true, restartIdentity: true })
  },
  userBiodata: async () => {
    await UserBiodata.destroy({ truncate: true, restartIdentity: true })
  },
  userHistory: async () => {
    await UserHistory.destroy({ truncate: true, restartIdentity: true })
  }
}
