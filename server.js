// importeert de benodigde apps
import express from 'express';
import { Liquid } from 'liquidjs';


// zorgt dat de public map gebruikt word voor content
const app = express();
app.use(express.static('public'))


// zorgt dat liquid de view engine is
const engine = new Liquid();
app.engine('liquid', engine.express()); 


// zorgt dat de views map gebruikt word voor de liquid templates
app.set('views', './views');


// zorgt dat werken met data wat fijner is
app.use(express.urlencoded({extended: true}))


// nodig voor het maken andere radiostations
const Radio = await fetch('https://fdnd-agency.directus.app/items/mh_radiostations')

const RadioJSON = await Radio.json()


// veronica page of homepage
app.get('/veronica', async function (request, response) {

  // nieuwe fetch met width en height van cover https://fdnd-agency.directus.app/items/mh_shows?fields=id,from,until,show.id,show.name,show.body,show.radiostation.name,show.users.mh_users_id.full_name,show.users.mh_users_id.cover.id,show.users.mh_users_id.cover.width,show.users.mh_users_id.cover.height&filter={%22show%22:{%22radiostation%22:{%22name%22:%22Radio%20Veronica%22}}}
  
  const algemeenVeronica = await fetch('https://fdnd-agency.directus.app/items/mh_shows?fields=id,from,until,show.id,show.name,show.body,show.radiostation.name,show.users.mh_users_id.full_name,show.users.mh_users_id.cover&filter={%22show%22:{%22radiostation%22:{%22name%22:%22Radio%20Veronica%22}}}&')
  const algemeenVeronicaJSON = await algemeenVeronica.json()

  const likedShows = await fetch('https://fdnd-agency.directus.app/items/mh_accounts/7?fields=id,name,liked_shows.mh_show_id.*.*.*')
  const likedShowsJSON = await likedShows.json()

  const radioStations = await fetch('https://fdnd-agency.directus.app/items/mh_radiostations')
  const radioStationsJSON = await radioStations.json()

  response.render('veronica.liquid', {algemeen: algemeenVeronicaJSON.data, radio:radioStationsJSON, likes:likedShowsJSON.data} )
})

// days data komt hier

// likes page veronica
app.get('/veronica/likes', async function (request, response) {

  const likedShows = await fetch('https://fdnd-agency.directus.app/items/mh_accounts/7?fields=id,name,liked_shows.mh_show_id.*.*.*')
  const likedShowsJSON = await likedShows.json()
  
response.render('veronica-likes.liquid', {algemeen: likedShowsJSON.data} )  // hierdoor geef je de opgevraagde data mee in de naam algemeen
})

// data & likes post
app.post('/veronica/like', async function (request, response) {

  //console.log(request.body) dit is om te checken of het werkt
  const testConsole = await fetch('https://fdnd-agency.directus.app/items/mh_accounts_shows', {
    method: 'POST',                       // hierdoor worden nieuwe likes met nieuwe ids toegevoegd
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      mh_accounts_id: 7,                  // dit is mijn account id
      mh_show_id: request.body.showid     // id opvragen van de body vanuit de data van de shows
     }),
  })
    // console.log(testConsole)
    response.redirect(303, '/veronica' )  // hierdoor word je teruggestuurd naar de homepage nadat je geliked hebt
})


// app.post('/veronica/likes', async function (request, response) {

//   const deleteLike = await fetch('https://fdnd-agency.directus.app/items/mh_accounts/7?fields=id,name,liked_shows.mh_show_id.id', {
//     method: 'DELETE',         
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     },
//   })

//   response.redirect(303, '/veronica/likes' )  // hierdoor word je teruggestuurd naar de likes page nadat je een like hebt verwijderd
// })

// error page

app.use((req, res, next) => {
  res.status(404).render('notfound.liquid'); // custom error page
})
  

app.post('/', async function (request, response) {
  response.redirect(303, '/')
})


// de port waarop de plaatselijke server draait
app.set('port', process.env.PORT || 8000)


// luistert naar de code hierboven en laat weten in de terminal zodra de server gestart is
app.listen(app.get('port'), function () {

    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
