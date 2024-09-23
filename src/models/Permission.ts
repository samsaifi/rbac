import mongoose, { Schema } from "mongoose";
import { IPermission } from "../types/types";

const permissionSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPermission>("Permission", permissionSchema);
