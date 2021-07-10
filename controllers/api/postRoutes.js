const router = require('express').Router();
const { Posts } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/createPost', withAuth, async (req, res ) => {
    try {
        const newPost = await Posts.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.delete('/delete', withAuth, async (req, res) => {
    try {
        const userPost = await Posts.destroy({
            where: {
                id: req.body.id,
                user_id: req.session.user_id,
            },
        });

        if (!userPost) {
            res.status(404).json({ message: 'This post does not exist.' })
        }

        res.status(200).json(userPost);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.put('/:id', (req, res) => {
console.log(req.body);
    Posts.update(
        {
            post_title: req.body.post_title,
            post_body: req.body.post_body,
        },
        {

            where: {

                id: req.body.where,
                user_id: req.session.user_id,
            },
        }
    )
        .then((updatedPost) => {
            res.json(updatedPost);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
});

module.exports = router;