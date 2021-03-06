const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Eroor');

    }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()

]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();

        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')

    }
});

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', async (req, res) => {
    updated_contact = await Contact
        .findByIdAndUpdate(req.params.id,
            {
                email: req.body.email,
                name: req.body.name,
                phone: req.body.phone,
                type: req.body.type,
                user: req.body.user
            },
            { returnOriginal: false }
        ).then((ret) => ret)
    res.json(updated_contact)
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', async (req, res) => {
    // Contact.findByIdAndDelete(req.id)
    const message = await Contact
        .findByIdAndRemove(req.params.id)
        .then(() => 'Contact deleted');

    res.json({ message });
});

module.exports = router;