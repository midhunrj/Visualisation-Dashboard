const express=require('express')
const {
 // importData,
  getDashboardData,
  getFilterOptions,
  getStats,
} =require( '../controllers/dashboardController.js')

const dataRouter = express.Router();


// dataRouter.post('/import', importData);

dataRouter.get('/', getDashboardData);


dataRouter.get('/filters', getFilterOptions);


dataRouter.get('/stats', getStats);

module.exports=dataRouter