const express = require('express');
const app = express();
const employeeRoute = express.Router();
// Employee model
let Employee = require('../../models/Employee');
// Add Employee
employeeRoute.route('/create').post((req, res, next) => {

  console.log("-----creat api data------")
  console.log(req.body);
  const newEmployee = new Employee(req.body);
  newEmployee.save().then((data)=>{
    Employee.find().then((resData) => {
      res.json(resData);
    })
  }).catch((err)=>{
      console.log(err);
  })
});
// Get All Employees
employeeRoute.route('/').get((req, res) => {
  Employee.find().then((data) => {
    res.json(data)
  }).catch((err)=>{
    return next(error);
  })
})
// Get single employee
employeeRoute.route('/read/:id').get((req, res) => {
  Employee.findById(req.params.id).then ((data) => {
      console.log("--------read data-----------");
      console.log(data);
      res.json(data)
  }).catch((err)=>{
    return next(error)
  })
})

// Update employee
employeeRoute.route('/update/:id').put((req, res, next) => {
  Employee.findByIdAndUpdate({_id:req.params.id},{
    $set: req.body
  }).then((data)=>{
    res.json(data)
  })
})
// Delete employee
employeeRoute.route('/delete/:id').delete((req, res, next) => {
  Employee.findOneAndRemove(req.params.id).then ((data) => {
    console.log("deleted successfully");
    res.json("deleted!");
  })
})
module.exports = employeeRoute;