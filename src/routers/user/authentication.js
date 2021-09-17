const express = require('express')
const User = require('../../models/user')
const router = new express.Router()
const passport = require('passport')

const registerInfoValidator = require('../../utils/user/registerInfoValidator')
const loginInfoValidator = require('../../utils/user/loginInfoValidator')

// @rout        POST /api/v1/users/user
// @desc        Return added user
// @access      public
router.post('/user', async (req, res) => {
    const validation_errors = await registerInfoValidator(req.body);
    if (validation_errors.length === 0) {
        const user = new User(req.body)
        try {
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token  })
        } catch (e) {
            res.status(400).send(e)
        }
    } else {
        res.status(400).json({ Error: validation_errors });
    }
})

// @rout        POST /api/v1/users/login
// @desc        Return user_id and access token
// @access      public
router.post('/login', async function (req, res) {

    const validation_errors = await loginInfoValidator(req.body);
    if (validation_errors.length === 0) {
        try {
            const user = await User.findByCredentials(req.body.loginField, req.body.password)
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (e) {
            res.status(400).send({Error:e.message})
        }
    } else {
        res.status(400).json({ Error: validation_errors });
    }
});



module.exports = router