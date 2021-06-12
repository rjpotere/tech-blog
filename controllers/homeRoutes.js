const router = require('express').Router();
const { User, Posts } = require('../models');
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    try {
        const postData = await Posts.findAll({
            include: [{
                model: User,
                attributes: ['name'],
            },
            ],
        });

        const posts = postData.map((posts) => posts.get({ plain: true })).map((post) => ({...post, isEditable: post.user_id === req.session.user_id})); //which template to render then render object 
console.log(posts);
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
            // userId: req.session.user_id,
        });

        console.log(`session:${req.session.user_id}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await Posts.findAll({
            where: {user_id: req.session.user_id },
        });

        const user = userData.map((posts) => posts.get({ plain: true })).map((post) => ({...post, isEditable: post.user_id === req.session.user_id}));;

        console.table(user)
        res.render('profile', {
            user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});


// add router.get for profile

// router.get('/profile', withAuth, async (req, res) => {
//     try {
//         const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ['password'] },
//             include: [{ model: Posts }]
//         });

//         const user = userData.get({ plain: true });
//         res.render('profile'), {
//             ...user,
//             logged_in: true
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;