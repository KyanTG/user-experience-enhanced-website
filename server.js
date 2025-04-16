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

