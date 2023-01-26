const sequelize = require('../config/connection')

const { User, Bloggy } = require('../models')

const userData = require('./userData.json')
const bloggyData = require('./bloggyData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true })

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  })

  for (const bloggy of bloggyData) {
    await Bloggy.create({
      ...bloggy,

      user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  }

  process.exit(0)
}

seedDatabase()
