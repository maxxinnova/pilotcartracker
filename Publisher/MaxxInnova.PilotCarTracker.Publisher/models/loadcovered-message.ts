import { mongoose } from "./database";
import { Document, Model, Schema } from "mongoose";

export interface ILoadCoveredMessage extends Document {
    mid: string;
    sid: string;
    posted: Date;
    from: string;
    body: string;
    raw: string;
    status: string;
    source: string;
}

export interface ILoadCoveredMessageModel extends Model<ILoadCoveredMessage> {
}

var schema = new Schema({
    mid: {
        type: String,
        required: true
    },
    sid: {
        type: String,
        required: true
    },
    posted: {
        type: Date,
        required: true,
        "default": Date.now()
    },
    from: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    raw: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        "default": "new"
    },
    source: {
        type: String,
        required: true,
        "default": "LoadCovered"
    }
});

export var message = mongoose.model<ILoadCoveredMessage>("Message", schema) as ILoadCoveredMessageModel;
