// import fs from 'fs';
// import path from 'path';
// import DataEntry from '../models/DataEntry.js';

// /**
//  * POST /api/dashboard/import
//  * Imports jsondata.json into MongoDB
//  */
//  const importData = async (req, res) => {
//   try {
//     const filePath = path.resolve('data/jsondata.json');
//     const rawData = fs.readFileSync(filePath, 'utf-8');
//     const jsonData = JSON.parse(rawData);

//     // Remove old data (optional)
//     await DataEntry.deleteMany({});

//     // Insert fresh data
//     await DataEntry.insertMany(jsonData);

//     res.status(200).json({
//       success: true,
//       message: 'Data imported successfully',
//       totalInserted: jsonData.length,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to import data',
//       error: error.message,
//     });
//   }
// };

// /**
//  * GET /api/dashboard
//  * Supports filtering and pagination
//  */
//  const getDashboardData = async (req, res) => {
//   try {
//     const {
//       end_year,
//       topic,
//       sector,
//       region,
//       pestle,
//       source,
//       country,
//       city,
//       swot,
//       page = 1,
//       limit = 100,
//     } = req.query;

//     const query = {};

//     if (end_year) query.end_year = end_year;
//     if (topic) query.topic = topic;
//     if (sector) query.sector = sector;
//     if (region) query.region = region;
//     if (pestle) query.pestle = pestle;
//     if (source) query.source = source;
//     if (country) query.country = country;
//     if (city) query.city = city;
//     if (swot) query.swot = swot;

//     const pageNumber = Number(page);
//     const limitNumber = Number(limit);
//     const skip = (pageNumber - 1) * limitNumber;

//     const [data, totalRecords] = await Promise.all([
//       DataEntry.find(query)
//         .skip(skip)
//         .limit(limitNumber)
//         .sort({ published: -1 }),

//       DataEntry.countDocuments(query),
//     ]);

//     res.status(200).json({
//       success: true,
//       totalRecords,
//       currentPage: pageNumber,
//       totalPages: Math.ceil(totalRecords / limitNumber),
//       limit: limitNumber,
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch dashboard data',
//       error: error.message,
//     });
//   }
// };

// /**
//  * GET /api/dashboard/filters
//  * Returns unique values for all filter dropdowns
//  */
//  const getFilterOptions = async (req, res) => {
//   try {
//     const getDistinctValues = async (field) => {
//       const values = await DataEntry.distinct(field);

//       return values
//         .filter(
//           (value) =>
//             value !== null &&
//             value !== undefined &&
//             value !== ''
//         )
//         .sort();
//     };

//     const filters = {
//       end_year: await getDistinctValues('end_year'),
//       topic: await getDistinctValues('topic'),
//       sector: await getDistinctValues('sector'),
//       region: await getDistinctValues('region'),
//       pestle: await getDistinctValues('pestle'),
//       source: await getDistinctValues('source'),
//       country: await getDistinctValues('country'),
//       city: await getDistinctValues('city'),
//       swot: await getDistinctValues('swot'),
//     };

//     res.status(200).json({
//       success: true,
//       filters,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch filter options',
//       error: error.message,
//     });
//   }
// };

// /**
//  * GET /api/dashboard/stats
//  * Returns summary statistics for dashboard cards
//  */
//  const getStats = async (req, res) => {
//   try {
//     const totalRecords = await DataEntry.countDocuments();

//     const [intensityResult] = await DataEntry.aggregate([
//       {
//         $group: {
//           _id: null,
//           averageIntensity: { $avg: '$intensity' },
//         },
//       },
//     ]);

//     const [likelihoodResult] = await DataEntry.aggregate([
//       {
//         $group: {
//           _id: null,
//           averageLikelihood: { $avg: '$likelihood' },
//         },
//       },
//     ]);

//     const [relevanceResult] = await DataEntry.aggregate([
//       {
//         $group: {
//           _id: null,
//           averageRelevance: { $avg: '$relevance' },
//         },
//       },
//     ]);

//     res.status(200).json({
//       success: true,
//       stats: {
//         totalRecords,
//         averageIntensity:
//           intensityResult?.averageIntensity || 0,
//         averageLikelihood:
//           likelihoodResult?.averageLikelihood || 0,
//         averageRelevance:
//           relevanceResult?.averageRelevance || 0,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch statistics',
//       error: error.message,
//     });
//   }
// };

// const fs=require('fs')
// const path=require('path')
// const { fileURLToPath } =require('url');
const  Insight =require('../models/dataModel')

// // Required because __dirname is not available in ES Modules
// const __filenames = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

/**
 * Build MongoDB query object from request query params
 */
const buildQuery = (queryParams) => {
  const allowedFilters = [
    'end_year',
    'start_year',
    'topic',
    'sector',
    'region',
    'pestle',
    'source',
    'country',
    'city',
  ];

  const query = {};

  allowedFilters.forEach((field) => {
    const value = queryParams[field];

    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      value !== 'all'
    ) {
      query[field] = value;
    }
  });

  return query;
};

/**
 * POST /api/insights/import
 * Reads jsondata.json and imports into MongoDB.
 */
//  const importData = async (req, res) => {
//   try {
//     // Path to JSON file
//     const filePath = path.join(process.cwd(), 'jsondata.json');

//     // Read file
//     const fileContent = fs.readFileSync(filePath, 'utf-8');

//     // Parse JSON
//     const jsonData = JSON.parse(fileContent);

//     // Remove existing data
//     await Insight.deleteMany({});

//     // Insert new data
//     const inserted = await Insight.insertMany(jsonData);

//     return res.status(200).json({
//       success: true,
//       message: 'Data imported successfully',
//       insertedCount: inserted.length,
//     });
//   } catch (error) {
//     console.error('Import Error:', error);

//     return res.status(500).json({
//       success: false,
//       message: 'Failed to import data',
//       error: error.message,
//     });
//   }
// };

/**
 * GET /api/insights
 * Returns filtered dashboard records.
 *
 * Example:
 * /api/insights?country=India&topic=oil
 */
 const getDashboardData = async (req, res) => {
  try {
    const query = buildQuery(req.query);

    const insights = await Insight.find(query)
      .sort({ published: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: insights.length,
      insights,
    });
  } catch (error) {
    console.error('Fetch Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: error.message,
    });
  }
};

/**
 * GET /api/insights/filters
 * Returns all unique values for filter dropdowns.
 */
 const getFilterOptions = async (req, res) => {
  try {
    const fields = [
      'end_year',
      'start_year',
      'topic',
      'sector',
      'region',
      'pestle',
      'source',
      'country',
      'city',
    ];

    const result = {};

    for (const field of fields) {
      const values = await Insight.distinct(field);

      result[field] = [
        'all',
        ...values
          .filter(
            (value) =>
              value !== null &&
              value !== undefined &&
              String(value).trim() !== ''
          )
          .sort(),
      ];
    }

    return res.status(200).json({
      success: true,
      filters: result,
    });
  } catch (error) {
    console.error('Filter Options Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch filter options',
      error: error.message,
    });
  }
};

/**
 * GET /api/insights/stats
 * Returns KPI metrics used in dashboard cards.
 */
 const getStats = async (req, res) => {
  try {
    const stats = await Insight.aggregate([
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          avgIntensity: { $avg: '$intensity' },
          avgLikelihood: { $avg: '$likelihood' },
          avgRelevance: { $avg: '$relevance' },
          countries: { $addToSet: '$country' },
          topics: { $addToSet: '$topic' },
        },
      },
      {
        $project: {
          _id: 0,
          totalRecords: 1,
          avgIntensity: {
            $round: [{ $ifNull: ['$avgIntensity', 0] }, 2],
          },
          avgLikelihood: {
            $round: [{ $ifNull: ['$avgLikelihood', 0] }, 2],
          },
          avgRelevance: {
            $round: [{ $ifNull: ['$avgRelevance', 0] }, 2],
          },
          totalCountries: {
            $size: {
              $filter: {
                input: '$countries',
                as: 'country',
                cond: {
                  $and: [
                    { $ne: ['$$country', null] },
                    { $ne: ['$$country', ''] },
                  ],
                },
              },
            },
          },
          totalTopics: {
            $size: {
              $filter: {
                input: '$topics',
                as: 'topic',
                cond: {
                  $and: [
                    { $ne: ['$$topic', null] },
                    { $ne: ['$$topic', ''] },
                  ],
                },
              },
            },
          },
        },
      },
    ]);

    const data =
      stats.length > 0
        ? stats[0]
        : {
            totalRecords: 0,
            avgIntensity: 0,
            avgLikelihood: 0,
            avgRelevance: 0,
            totalCountries: 0,
            totalTopics: 0,
          };

    return res.status(200).json({
      success: true,
      stats: data,
    });
  } catch (error) {
    console.error('Stats Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
      error: error.message,
    });
  }
};

module.exports={
    getDashboardData,
    getFilterOptions,
    getStats,
    buildQuery
}