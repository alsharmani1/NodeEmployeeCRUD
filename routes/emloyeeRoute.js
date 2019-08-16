const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Employee list
router.get('/', (req, res) => {
    Employee.find((err, items) => {
        if(!err) {
            res.render('employeeList', { 
                list: items
            }); 
        } else {
            console.log('Error retrieving data');
        } 
    })
});

// Employee form
router.get('/submit', (req, res) => {
    res.render('employeeForm', {
        item: ""
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
             res.json(err)
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
            res.json(err)
        }
    }
     
});

// Get Employee by ID
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, id) => {
        if(!err) {
            res.render('employeeForm', {
                title: "Edit Employee",
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
        res.send('Error while deleting')
    }
});

module.exports = router;  