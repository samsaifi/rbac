import mongoose, { Schema } from "mongoose";
import { IRole } from "../types/types";

const roleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Permission",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRole>("Role", roleSchema);
