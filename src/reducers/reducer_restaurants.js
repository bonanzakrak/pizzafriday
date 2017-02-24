export default function(state = [], action) {
  switch (action.type) {
    case('UPDATE_RESTAURANT'):{
      return action.payload
    }
  }

  return state
}
/*
let restaurants = [
  {
    id: 1,
    title: 'Moa burger',
    website: 'http://moaburger.com/'
  }, {
    id: 3,
    title: 'Mamma mia',
    website: 'http://mammamia.net.pl/pl/'
  }, {
    id: 4,
    title: 'Tata burger',
    website: 'http://burgertata.pl/menu-krupnicza/'
  }, {
    id: 5,
    title: 'Haiku sushi',
    website: 'http://haikusushi.pl/zestawy-na-lunch.html'
  }
]*/