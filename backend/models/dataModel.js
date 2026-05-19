const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
  end_year: { type: String, default: '' },
  intensity: { type: Number, default: 0 },
  sector: { type: String, default: '' },
  topic: { type: String, default: '' },
  insight: { type: String, default: '' },
  url: { type: String, default: '' },
  region: { type: String, default: '' },
  start_year: { type: String, default: '' },
  impact: { type: String, default: '' },
  added: { type: String, default: '' },
  published: { type: String, default: '' },
  country: { type: String, default: '' },
  relevance: { type: Number, default: 0 },
  pestle: { type: String, default: '' },
  source: { type: String, default: '' },
  title: { type: String, default: '' },
  likelihood: { type: Number, default: 0 },
  city: { type: String, default: '' },
  swot: { type: String, default: '' }
}, { timestamps: true });

insightSchema.index({ sector: 1 });
insightSchema.index({ topic: 1 });
insightSchema.index({ region: 1 });
insightSchema.index({ country: 1 });
insightSchema.index({ source: 1 });
insightSchema.index({ pestle: 1 });

module.exports = mongoose.model('Insight', insightSchema);
