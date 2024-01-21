import mongoose, { Model, Document } from "mongoose";
interface IPassword {
  password: string;
  email: string;
}

interface PasswordModel extends Model<IPassword> {
  build(attrs: IPassword): PasswordDoc;
}

interface PasswordDoc extends Document {
  _id?: string;
  password: string;
  email: string;
}

const passwordSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  email: {
    type: String,
    required: true,
  },
});

passwordSchema.statics.build = (password: IPassword) => {
  return new Password(password);
};

const Password = mongoose.model<PasswordDoc, PasswordModel>(
  "password",
  passwordSchema
);

export { Password };
