//This code creates a new Express Router, imports the bloggy and User model from the models directory, and imports an authentication middleware from the utils directory.

const router = require('express').Router();
const { Bloggy, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // get all blogs and join with user data
    const bloggyData = await Bloggy.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // serialize the data so the template can read it
    const bloggy= bloggyData.map((bloggy) =>
      bloggy.get({ plain: true })
    );
    // pass serialized data and session flag into template
    res.render('homepage', {
      bloggy,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

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
    });
    console.log(bloggyData);
    const bloggy =  bloggyData.get({ plain: true });
    console.log(bloggy);
    res.render('bloggy', {
      ...bloggy,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// corresponds with FE profile.js
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Bloggy }],
    });

    const user = userData.get({ plain: true });

    // renders profile.handlebars
    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // if the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
