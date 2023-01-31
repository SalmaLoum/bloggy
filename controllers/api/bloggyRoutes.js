const router = require('express').Router()
const { Bloggy } = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
  try {
    const newBloggy = await Bloggy.create({
      ...req.body,
      user_id: req.session.user_id,
    })

    res.status(200).json(newBloggy)
  } catch (err) {
    res.status(400).json(err)
  }
})

// check that GET request is working, it is
// router.get('/', (req, res) => {
//   res.json("hello");
// })

router.get('/:id', withAuth, async (req, res) => {
  try {
    const bloggyData = await Bloggy.findOne({ where: { id: req.params.id } })
    const bloggy = bloggyData.get({ plain: true })

    res.status(200).json(bloggy)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:id', withAuth, async (req, res) => {
  try {
    const newBloggy = await Bloggy.update(req.body, {
      where: { id: req.params.id },
    })

    res.status(200).json(newBloggy)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const bloggyData = await Bloggy.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    })

    if (!bloggyData) {
      res.status(404).json({ message: 'No blog found with this id!' })
      return
    }

    res.status(200).json(bloggyData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
