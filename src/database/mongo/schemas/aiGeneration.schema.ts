import { model, Model, Schema } from "mongoose";
import { IAiGeneration } from "../interfaces";

const aiGenerationSchema = new Schema<IAiGeneration>({
  title: {
    type: String,
    required: true,
  },
  generatedImageUrl: {
    type: String,
    default: "",
  },
  inputImageUrl: {
    type: String,
    default: "",
  },
});

export const AiGeneration = model<IAiGeneration>("AiGeneration", aiGenerationSchema);

aiGenerationSchema.set("toJSON", {
  transform(doc, ret) {
    ret.id = doc._id;
    return ret;
  },
});
aiGenerationSchema.set("toObject", { transform: true });
