import * as mongoose from "mongoose"

(mongoose as any).Promise = global.Promise;

mongoose.connect("mongodb://pctodb.documents.azure.com:10255/publisher?ssl=true",
    {
        user: "pctodb",
        pass: "LolyzdFCO22sELCuxm0VepBMHdIBDgqb422p0XEjm8wwOju8HEh7kRUfFxQhjb3MrFx1Z8pbKHWTE0BUheFomQ=="
    });

export { mongoose };
