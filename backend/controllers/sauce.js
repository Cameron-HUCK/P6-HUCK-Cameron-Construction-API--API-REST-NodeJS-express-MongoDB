// CRUD exporter
const express = require('express');
const Sauce = require('../models/sauce');
const fs = require('fs');

// Allows you to create and add a sauce
exports.createSauce =  (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauceData = new Sauce({
    ...sauceObject,
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauceData.save()
  .then(() => res.status(201).json({ message: 'Sauce saved!'}))
  .catch(error => res.status(400).json({ error }));
}

// Allows you to modify the sauce information
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }:

  {
    ...req.body 
  };
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
  const filename = sauce.imageUrl.split('/images/')[1];
  fs.unlink(`images/${filename}`, () => {
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce changed!'}))
    .catch(error => res.status(400).json({error : "Sauce not find" }));
  })
}
  )}

// Remove the selected sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce removed!'}))
      .catch(error => res.status(400).json({error : "Sauce not find"}));
    });
  })
  .catch(error => res.status(500).json({ error }));
};

// Select a single sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(async sauce => {
      if(!sauce){
        res.status(404).json({message: "The sauce does not exist"});
      }else{
        res.status(200).json(await sauce);
      }
    })
    .catch(error => res.status(500).json({error : "Sauce not find" }));
  }

// Select all sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
  }

//Allows you to put a "I like" or "dislike"
exports.likeAndDislikes = (req, res, next) => {
  // Identification of the sauce
  Sauce.findOne({_id:req.params.id})
  .then(async sauce => {
    
    if(!sauce){
      res.status(404).json({message: "The sauce does not exist"});
    // Sinon on envoie la valeur userId  dans le tableau de like de la sauce
    }else{
      let userId = req.body.userId;
      let like = req.body.like;
      let usersLiked = sauce.usersLiked;
      let usersDisliked = sauce.usersDisliked

      switch (like){
        case 1:
        usersLiked.addToSet(userId);
          break;
        case 0:
          // Array.filter allows you to create a new array with all the values ​​that will be equal to true
          usersLiked = usersLiked.filter(element => element !== userId);
          usersDisliked = usersDisliked.filter(element => element !== userId);
          break;
        case -1:
          usersDisliked.addToSet(userId);
          break;
        default:
          res.status(402).send({message: 'Unknown value '})  
          break;
      }
      // The function waiting for a response with the word await 
      let likes = usersLiked.lenght;
      let dislikes = usersDisliked.length;
      await Sauce.updateOne({
        usersLiked: usersLiked,
        usersDisliked: usersDisliked,
        likes: likes,
        dislikes: dislikes
      });
      res.status(200).send({message: 'Modification like made'})
    }
  })
    .catch(error => res.status(500).json({ error }));
}