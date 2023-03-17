const Annonce = require('../models/annonces.js')

const getAllAnnonces = async (req,res)=>{
  try{
  const data = await Annonce.find();
  res.status(200).json({ data: data })
  }
  catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
}

const getFilteredAnnonces = async (req, res) => {
  const filters = req.query;
  const data = await Annonce.find();
  const filteredAnnonces = data.filter(annonce => {
    let isValid = true;
    for (key in filters) {
      console.log(key, annonce[key], filters[key]);
      isValid = isValid && market[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredAnnonces);
}
