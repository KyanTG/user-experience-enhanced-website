// importeert de benodigde apps

import express from 'express';
import { Liquid } from 'liquidjs';

// zorgt dat de public map gebruikt word voor content

const app = express();
app.use(express.static('public'))





