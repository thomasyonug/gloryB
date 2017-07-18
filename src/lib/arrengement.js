const userModel = require('../models').userModel

async function addCardGroup (query, groupName) {
  return userModel.update(
            query,
    {
      $push: {
        'arrengement.cardGroups': {
          groupName,
          cards: []
        }
      }
    }
        ).exec()
}

async function updateCardGroup ({username}, cardGroup) {
  return userModel.update(
        {username, 'arrengement.cardGroups.groupName': cardGroup.groupName},
    {
      $set: {
        'arrengement.cardGroups.$.cards': cardGroup.cards
      }
    }).exec()
}

async function deleteCardGroup (query) {
  const {
        _id,
        username
    } = query

  const user = await userModel.findOne({username}).exec()
  user.arrengement.cardGroups.pull({_id})
  return user.save()
}

async function findCardGroup (query) {
  return userModel.findOne(query).exec()
}

async function updateUsingGroup ({username}, usingGroup) {
  return userModel.update(
        {username},
    {
      $set: {
        'arrengement.usingGroup.groupName': usingGroup.groupName
      }
    }
    ).exec()
}

module.exports = {
  addCardGroup,
  updateCardGroup,
  findCardGroup,
  deleteCardGroup,
  updateUsingGroup
}
