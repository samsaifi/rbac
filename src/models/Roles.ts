import mongoose, { Schema } from "mongoose";
import { IRole } from "../types/types";

const RoleSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
});

export default mongoose.model<IRole>("Role", RoleSchema);
