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

const displayPostulate = async (req,res)=>{
  try {
    const { id } = req.body
    const service = Service.findById(id)
    const peopleWhoPostulated = service.list_form_postulate
    res.status(201).json(peopleWhoPostulated); //this is an id for form, so we gotta search in filter form
  } catch (err) {
    res.status(400).json(err);
  }
}

const acceptFreelancer = async (req,res)=>{
  try {
    const {id_form_freelancer, id_annonce} = req.body
    const service = Service.findById(id_annonce)
    const freelancerForms = service.list_form_postulate
    i = freelancerForms.indexOf(id_form_freelancer)
    freelancerForms =  freelancerForms[i]
    service.freelancerForms = freelancerForms
    service.isActive = false
    service.save()
    res.status(201).json(freelancerForms); 
  } catch (err) {
    res.status(400).json(err);
  }
}

const refuseFreelancer = async (req,res)=>{
  try {
    const {id_form_freelancer, id_annonce} = req.body
    const service = Service.findById(id_annonce)
    const freelancerForms = service.list_form_postulate
    i = freelancerForms.indexOf(id_form_freelancer)
    delete freelancerForms[i]
    service.freelancerForms = freelancerForms
    service.save()
    res.status(201).json(freelancerForms); 
  } catch (err) {
    res.status(400).json(err);
  }
}

const serviceIsOutdated = async (req,res)=>{
  try {
    const { id } = req.body
    const service = await Service.findById(id);
    service.isActive = false
    service.save()
    res.status(201).json(service);
  } catch(err) {
    res.status(400).json(err);
  }
}


module.exports = { getAllServices, getFilteredServices, addService, getAllServicesOfOneClient, set_as_finished_client_true, set_as_finished_freelancer_true, displayPostulate, serviceIsOutdated, refuseFreelancer, acceptFreelancer }