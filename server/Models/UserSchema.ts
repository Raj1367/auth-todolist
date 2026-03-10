import mongoose, { Document } from "mongoose";

export interface userSchemaType {
  username: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'GENERAL';
}

export interface userSchemaDocumentType extends userSchemaType, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<userSchemaDocumentType>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model('user', userSchema);
export default userModel;
