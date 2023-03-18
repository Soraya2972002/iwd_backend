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

const getAllServicesOfOneClient = async (req,res)=>{
  try{
    const id = req.body
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
    KeyWords, 
    id_client} = req.body;
  let image = req.files.coverImages;
  console.log(image)
  image.mv(path.join(__dirname, 'imgServices/') + image.name)
  const newService = await Service.create({
          title, 
          ServiceDescription, 
          latitude, 
          longtitude, 
          MoneyOffer,
          Duration,
          KeyWords,
          coverImages : 'imgServices/' + image.name,
          id_client
      });
  res.status(201).json(newService);
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
}

const set_as_finished_client_true = async (req,res)=>{
  try {
    const { id } = req.body
    const service = Service.findById(id)
    service.set_as_finished_client = true
    service.save()
    res.status(201).json(service);
}
  catch (err) {
    res.status(400).json(err);
  }
}

const set_as_finished_freelancer_true = async (req,res)=>{
  try {
    const { id } = req.body
    const service = Service.findById(id)
    service.set_as_finished_freelancer = true
    service.save()
    res.status(201).json(service);
}
  catch (err) {
    res.status(400).json(err);
  }
}


module.exports = { getAllServices, getFilteredServices, addService, getAllServicesOfOneClient, set_as_finished_client_true, set_as_finished_freelancer_true }