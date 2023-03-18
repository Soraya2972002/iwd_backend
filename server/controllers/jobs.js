const Job = require('../models/jobs.js')
const path = require("path");

const getAllJobs = async (req,res)=>{ 
  try{
  const data = await Job.find();
  res.status(200).json({ data: data })
  }
  catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
}

const getFilteredJobs = async (req, res) => {
  const filters = req.query;
  const data = await Job.find();
  const filteredJobs = data.filter(job => {
    let isValid = true;
    for (key in filters) {
      console.log(key, job[key], filters[key]);
      isValid = isValid && job[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredJobs);
}

const addJob = async (req,res)=>{
  try{
  const { title, 
    jobDescription, 
    MoneyOffer,
    Duration,
    DemandedSkills, } = req.body;
  let image = req.files.coverImages;
  console.log(image)
  image.mv(path.join(__dirname, 'imgJobs/') + image.name)
  const newService = await Job.create({
          title, 
          jobDescription,  
          MoneyOffer,
          Duration,
          DemandedSkills,
          coverImages : 'imgJobs/' + image.name,
      });
  res.status(201).json(newService);
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
}

const jobIsOutdated = async (req,res)=>{ // this is for when the announce is outdated, it won't be displayed anymore
  try {
    const { id } = req.body
    const job = await Job.findById(id);
    job.isActive = false
    job.save()
    res.status(201).json(job);
  } catch(err) {
    res.status(400).json(err);
  }
}

module.exports = { getAllJobs, getFilteredJobs, addJob, jobIsOutdated }