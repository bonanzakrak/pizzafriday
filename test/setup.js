import async from 'async'

let restaurants = [
  {
    title: 'first restaurant',
    website: 'http://localhost/restaurant/1'
  }, {
    title: 'second restaurant',
    website: 'http://localhost/restaurant/2'
  }
]

before(function(done) {

  getToken()
    .then(function(serverToken) {
      // global.document.cookie = "JWT=" + res.body
      cleanup().then(setupRestaurants(function() {
        done()
      })).catch(error => console.log(error))
    })
    .catch(function(error) {})

})

const cleanup = () => {
  return models
    .Restaurant
    .remove({})
}
const setupRestaurants = (done) => {

  async
    .each(restaurants, function(restaurant, cb) {
      models
        .Restaurant
        .create(restaurant)
        .then(result => {
          restaurant._id = result._id;
          cb()
        })
        .catch(error => console.log(error))

    }, done)

}

module.exports = {
  restaurants
}