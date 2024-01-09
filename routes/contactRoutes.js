const express = require('express');
const { getAllContacts, createContacts, getContactsById, updateContacts, deleteContacts } = require('../controllers/contactControllers');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

router.use(validateToken);
router.route("/").get(getAllContacts).post(createContacts);
router.route("/:id").get(getContactsById).put(updateContacts).delete(deleteContacts);

module.exports = router;