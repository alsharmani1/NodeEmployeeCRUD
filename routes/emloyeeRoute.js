const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Employee list
router.get('/', (req, res) => {
    try { 
        Employee.find((err, items) => {
            if(!err) {
                res.render('employeeList', { 
                    title: 'Employee List',
                    list: items
                }); 
            } 
        });
    } catch (err) { 
        res.render('error', {
            title: "Error Page",
            message: "There was a problem getting the employee list. Please try again later!"
        });
     }
});

// Employee form
router.get('/submit', (req, res) => {
    res.render('employeeForm', {
        item: "",
        title: 'Add / Edit Employee',
    }); 
});


// Post to database
router.post('/submit', async (req, res) => {  
    // Insert new record
    if (req.body._id == '') {
        const post = new Employee({
            name: req.body.name,
            email: req.body.email,
            city: req.body.city,
            phone: req.body.phone
         });
    
         const saved = await post.save();
    
         try{
             res.redirect('/');
         } catch(err){
            res.render('error', {
                title: "Error Page",
                message: "There was a problem adding employee. Please try again later!"
            });
         }
    } else {
        // Update existing record
        try {
            const updated = await Employee.updateOne(
                { _id: req.body._id }, 
                { $set: 
                    { 
                        name: req.body.name,
                        email: req.body.email,
                        city: req.body.city,
                        phone: req.body.phone
                    } 
                });

            res.redirect('/');
        } catch (err) {
            res.render('error', {
                title: "Error Page",
                message: "There was a problem updating employee. Please try again later!"
            });
        }
    }
     
});

// Get Employee by ID
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, id) => {
        if(!err) {
            res.render('employeeForm', {
                title: "Add / Edit Employee",
                item: id
            });
        }
    });
});

//Delete one record
router.get('/delete/:id', async (req, res) => {
    try {
        const removed = await Employee.deleteOne({ _id: req.params.id });
        res.redirect('/');
    } catch(err) {
        res.render('error', {
            title: "Error Page",
            message: "There was a deleting the employee. Please try again later!"
        });
    }
});

module.exports = router;  