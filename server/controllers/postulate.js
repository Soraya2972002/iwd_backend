const Form = require('../models/postulate')
const path = require("path");


const getFilteredForms = async (req, res) => { 
  const filters = req.query;
  const data = await Form.find();
  const filteredForms = data.filter(form => {
    let isValid = true;
    for (key in filters) {
      console.log(key, form[key], filters[key]);
      isValid = isValid && form[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredForms);
}

const addForm = async (req,res)=>{ // this is a form that the freelancer fills with the hope of getting the job
  try{
  const { text, 
    amount, 
    credit,
    id_freelancer } = req.body;
  const newForm = await Form.create({
    text, 
    amount, 
    credit,
    id_freelancer 
      });
  res.status(201).json(newForm);
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
}


module.exports = { addForm, getFilteredForms }