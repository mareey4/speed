import mongoose, { Schema, Document, Model } from 'mongoose';

interface IAnalysis extends Document {
  analysisField: string;
  createdAt: Date;
}

const analysisSchema: Schema<IAnalysis> = new Schema({
  analysisField: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Analysis: Model<IAnalysis> = mongoose.model<IAnalysis>('Analysis', analysisSchema);

export default Analysis;
