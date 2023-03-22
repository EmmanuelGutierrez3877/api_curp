import * as mongoose from 'mongoose'

export const curpSchema =  new mongoose.Schema({
    curp: {type: String, require: true, unique:true}
}, {timestamps: true});
