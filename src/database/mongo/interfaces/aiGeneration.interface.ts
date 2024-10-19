import { Document } from "mongoose";

export interface IAiGeneration extends Document {
  title: string;
  inputImageUrl: string;
  generatedImageUrl: string;
}
