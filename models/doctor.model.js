const { Schema, model } = require("mongoose");

const DoctorSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: "Hospital",
  },
});

UserSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();

  object.uid = _id;
  return object;
});

module.exports = model("Doctor", DoctorSchema);
