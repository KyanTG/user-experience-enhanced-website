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
















// de port waarop de plaatselijke server draait

app.set('port', process.env.PORT || 8000)

// luistert naar de code hierboven en laat weten in de terminal zodra de server gestart is

app.listen(app.get('port'), function () {

    console.log(`Application started on http://localhost:${app.get('port')}`)
  })
