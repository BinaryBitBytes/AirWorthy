import { join } from 'path';
import {apiRoutes} from './api/index.js';
//! ^problem 5.15.23 4:20 am
const router = require('express').Router();

router.use('/api', apiRoutes);

// serve up react front-end in production
router.use((req, res) => {
  res.sendFile(join(__dirname, '../../client/build/index.html'));
});

export default router;
