const Service = require('../models/services.js')
const path = require("path");

const getAllServices = async (req,res)=>{
  try{
  const data = await Service.find();
  res.status(200).json({ data: data })
  }
  catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
}

const getFilteredServices = async (req, res) => {
  const filters = req.query;
  const data = await Service.find();
  const filteredServices = data.filter(service => {
    let isValid = true;
    for (key in filters) {
      console.log(key, service[key], filters[key]);
      isValid = isValid && service[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredServices);
}

const addService = async (req,res)=>{
  try{
  const { title, 
    ServiceDescription, 
    latitude, 
    longtitude, 
    MoneyOffer,
    Duration,
    KeyWords, } = req.body;
  let image = req.files.coverImages;
  console.log(image)
  image.mv(path.join(__dirname, 'img/') + image.name)
  const newService = await Service.create({
          title, 
          ServiceDescription, 
          latitude, 
          longtitude, 
          MoneyOffer,
          Duration,
          KeyWords,
          coverImages : 'img/' + image.name,
      });
  res.status(201).json(newService);
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
}

module.exports = { getAllServices, getFilteredServices, addService }