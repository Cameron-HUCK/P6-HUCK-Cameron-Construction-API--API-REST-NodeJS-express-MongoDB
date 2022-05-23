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
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauceData.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
      .catch(error => res.status(400).json({ error }));
    }

// Allows you to modify the sauce information
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
      .catch(error => res.status(400).json({ error }));
    }

// Remove the selected sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};

// Select a single sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(async sauce => {
        if(!sauce){
          res.status(404).json({message: "La sauce n\'existe pas"});
        }else{
          res.status(200).json(await sauce);
        }
      })
      .catch(error => res.status(500).json({ error }));
    }

// Select all sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(400).json({ error }));
  }

// Allows you to put a "I like" or "dislike"
exports.likeAndDislikes = (req, res, next) => {
    // identification de la sauce
  Sauce.findOne({_id:req.params.id})
    .then(async sauce => {
        if(!sauce){
          res.status(404).json({message: "La sauce n\'existe pas"});
        }else{
          let userIdentifiant = req.body.userId;
          let likeStatus = req.body.like;
          let usersLiked = sauce.usersLiked;
          let usersDisliked = sauce.usersDisliked
          switch (likeStatus){

            case 1:
              ({_id:req.params.id},{$inc:{likes:+1},$push:{usersLiked:userIdentifiant}})
                break;
            case 0:
              ({_id:req.params.id},{$inc:{likes:-1},$pull:{usersLiked:userIdentifiant}})
              ({_id:req.params.id},{$inc:{dislikes:-1},$pull:{usersDisliked:userIdentifiant}})
                break;
            case -1:
              ({_id:req.params.id},{$inc:{dislikes:+1},$push:{usersDisliked:userIdentifiant}})
                break;
            default:
                
                break;
          }
        }
      })
      .catch(error => res.status(500).json({ error }));
}

  /*/ If the user like the sauce, the "like" increases by 1
  if(likeStatus === 1) {
    Sauce.updateOne({_id:req.params.id},{$inc:{likes:+1},$push:{usersLiked:userIdentifiant}})
    .then(async sauce => res.status(201).json({message:"Le like a été appliqué"}))
    .catch(error => res.status(400).json(error))
  }

  //If the user doesn't like anymore the sauce, the dislike is decrease to one
  if (likeStatus === 0) {
    Sauce.updateOne({_id:req.params.id},{$inc:{likes:-1},$pull:{usersLiked:userIdentifiant}})
    .then(async sauce => res.status(201).json({message:"Le like a été annulé"}))
    .catch(error => res.status(400).json(error))

    Sauce.updateOne({_id:req.params.id},{$inc:{dislikes:-1},$pull:{usersLiked:userIdentifiant}})
    .then(async sauce => res.status(201).json({message:"Le dislike a été annulé"}))
    .catch(error => res.status(400).json(error))
  }

  // If the user doesn't like the sauce we add a negative value -1
  if (likeStatus === -1) {
    Sauce.updateOne({_id:req.params.id},{$inc:{dislikes:+1},$push:{usersLiked:userIdentifiant}})
    .then( async sauce=> res.status(201).json({message:"Le dislike a été appliqué"}))
    .catch(error => res.status(400).json(error))
  }*/
