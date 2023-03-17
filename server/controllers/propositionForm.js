const propositionForm = require('../models/propositionForm')

const addpropositionForm = async (req,res)=>{
  try{
  const { propositionText, 
    bids, 
    report, } = req.body;
  const newpropositionForm = await propositionForm.create({
    propositionText, 
    bids, 
    report,
      });
  res.status(201).json(newpropositionForm);
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
}

const getFilteredPropositionForms = async (req, res) => {
  const filters = req.query;
  const data = await propositionForm.find();
  const filteredpropositionForm = data.filter(propositionForm => {
    let isValid = true;
    for (key in filters) {
      console.log(key, propositionForm[key], filters[key]);
      isValid = isValid && propositionForm[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredpropositionForm);
}

module.exports = { addpropositionForm, getFilteredPropositionForms }