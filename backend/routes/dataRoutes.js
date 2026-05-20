const express=require('express')
const {

  getDashboardData,
  getFilterOptions,
  getStats,
} =require( '../controllers/dashboardController.js')

const dataRouter = express.Router();


dataRouter.get('/', getDashboardData);


dataRouter.get('/filters', getFilterOptions);


dataRouter.get('/stats', getStats);

module.exports=dataRouter