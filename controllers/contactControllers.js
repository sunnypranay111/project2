const asyncHandler = require('express-async-handler')
const Contact = require('../model/contactModel');

//description Get all contacts
//route GET /api/contacts
//acces private
const getAllContacts = asyncHandler(async(req, res)=>{
    const contact = await Contact.find({user_id : req.user.id});
    res.status(200).json(contact);
});


//description Create contacts 
//route POST /api/contacts
//acces private
const createContacts = asyncHandler(async(req, res)=>{
    console.log("req.body======", req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
       res.status(400);
       throw new Error("All fildes are mandatory...!") 
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//description Get contacts by ID
//route GET /api/contacts/:id
//acces private
const getContactsById = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact);
});

//description Update contacts
//route PUT /api/contacts/:id
//acces private
const updateContacts = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("user doesn't have access to update another user contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true});

    res.status(200).json(updatedContact);
});

//description Delete contacts
//route DELETE /api/contacts/:id
//acces private
const deleteContacts = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString()!== req.user.id){
        res.status(403);
        throw new Error("user doesn't have access to delete another user contact");
    }
    await Contact.deleteOne({_id : req.params.id});
    res.status(200).json(contact);
});


module.exports = {getAllContacts, createContacts, getContactsById, updateContacts,deleteContacts}