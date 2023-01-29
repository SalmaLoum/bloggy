const router = require('express').Router()
const { Bloggy, User, Comments } = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const bloggyData = await Bloggy.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    })

    // serialize the data so the template can read it
    const blogs = bloggyData.map((bloggy) => bloggy.get({ plain: true }))
    console.log(blogs)
    // pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/bloggy/:id', async (req, res) => {
  try {
    const bloggyData = await Bloggy.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },

        {
          model: Comments,
          include: User,
        },
      ],
    })

    const bloggy = bloggyData.get({ plain: true })

    res.render('bloggy', {
      ...bloggy,
      logged_in: req.session.logged_in,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// Use withAuth middleware to prevent access to route
// corresponds with FE profile.js
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Bloggy }],
    })

    const user = userData.get({ plain: true })
    console.log(user)
    // renders profile.handlebars
    res.render('profile', {
      ...user,
      logged_in: true,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/login', (req, res) => {
  // if the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile')
    return
  }

  res.render('login')
})

module.exports = router
