const  Insight =require('../models/dataModel')


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


 const getDashboardData = async (req, res) => {
  try {

    console.log("hello dahs");
    
    const query = buildQuery(req.query);

    const insights = await Insight.find(query)
      .sort({ published: -1 })
      .lean();

      console.log("bye bye");
      
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