/*{
  "_id": ObjectId("58affdeba0f6a74fdb892b10"),
  "id": "U2GENSMSN",
  "user": {
    "name": "Kateryna Vashchuk",
    "id": "U2GENSMSN",
    "email": "kate@gettechforce.com",
    "image_24": "https://avatars.slack-edge.com/2016-09-27/84434339859_14770bb86bd87e568548_24.jpg",
    "image_32 ": "https://avatars.slack-edge.com/2016-09-27/84434339859_14770bb86bd87e568548_32.jpg",
    "image_48": "https://avatars.slack-edge.com/2016-09-27/84434339859_14770bb86bd87e568548_48.jpg",
    "image_72": "https://avatars.slack-edge.com/2016-09-27/84434339859_14770bb86bd87e568548_72.jpg",
    "image_192": "https://avatars.slack-edge.com/2016-09-27/84434339859_14770bb86bd87e568548_192.jpg",
    "image_512": "https://avatars.slack-edge.com/2016-09-27/84434339859_14770bb86bd87e568548_512.jpg",
    "image_1024 ": "https://avatars.slack-edge.com/2016-09-27/84434339859_14770bb86bd87e568548_512.jpg"
  }
}*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

module.exports = new Schema({
  id: {
    //required: true,
    type: String
  },
  user: {
    id: {
      //required: true,
      type: String
    },
    name: {
      //required: true,
      type: String
    },
    email: {
      //required: true,
      type: String
    },
    //"image_24": String,
    //"image_32 ": String,
    "image_48": String,
    "image_72": String,
    //"image_192": String,
    //"image_512": String,
    //"image_1024 ": String
  }
})