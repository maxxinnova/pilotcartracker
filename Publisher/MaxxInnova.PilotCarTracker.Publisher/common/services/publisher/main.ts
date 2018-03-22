import * as moment from "moment";
import * as database from "../../../models/database";

class Publisher {
    private database: any;

    private async parseMessage(message) {
        //console.log(message.body);

        var values = message.body.split("\n");

        if (values.Length < 8) {
            throw "Format Error: Message has less than 8 lines";
        }

        var companyStr = <string>values[1];

        if (companyStr === null || companyStr.match(/^ *$/) !== null) {
            throw "Format Error: Company is empty";
        }

        var company = companyStr.trim();

        var phoneStr = <string>values[2];

        if (phoneStr === null || phoneStr.match(/^ *$/) !== null) {
            throw "Format Error: Phone number is empty";
        }

        phoneStr = phoneStr.trim();

        var match = phoneStr.match(/^\(?(\d{3})\)?[-\.]? *(\d{3})[-\.]? *[-\.]?(\d{4})$/);

        if (match == null || match.length < 4) {
            throw `Format Error: Phone number, ${phoneStr}`;
        }

        var phone = `${match[1]}${match[2]}${match[3]}`;

        var originStr = <string>values[3];

        if (originStr === null || originStr.match(/^ *$/) !== null) {
            throw "Format Error: Origin is empty";
        }

        originStr = originStr.trim();

        //match = originStr.match(`(.+)\\s+(${(await this.getStates()).join('|')})`);

        if (match == null || match.length < 3) {
            throw `Format Error: Origin incorrectly formatted, ${originStr}`;
        }

        var originState = match[2].trim();

        var originCity = match[1].trim();

        //if ((await this.getCities(originState)).indexOf(originCity) == -1) {
        //    throw `Format Error: Origin city not found, ${originCity}, ${originState}`;
        //}

        var originRegion = await this.getRegion(originState);

        var destStr = <string>values[4];

        if (destStr === null || destStr.match(/^ *$/) !== null) {
            throw "Format Error: Destination is empty";
        }

        destStr = destStr.trim();

        //match = destStr.match(`(.+)\\s+(${(await this.getStates()).join('|')})`);

        if (match == null || match.length < 3) {
            throw `Format Error: Destination incorrectly formatted, ${destStr}`;
        }

        var destState = match[2].trim();

        var destCity = match[1].trim();

        //if ((await this.getCities(destState)).indexOf(destCity) == -1) {
        //    throw `Format Error: Destination city not found, ${destCity}, ${destState}`;
        //}

        var destRegion = await this.getRegion(destState);

        var positionStr = <string>values[5];

        if (positionStr === null || positionStr.match(/^ *$/) !== null) {
            throw "Format Error: Escort position is empty";
        }

        var position = positionStr.trim();

        if (["Chase", "High Pole", "Lead", "Route Survey", "Steer"].indexOf(position) === -1) {
            throw `Format Error: Escort position not found, ${positionStr}`;
        }

        var loadDateStr = <string>values[6];

        if (loadDateStr === null || loadDateStr.match(/^ *$/) !== null) {
            throw "Format Error: Posted date is empty";
        }

        var loadDate = new Date(loadDateStr.trim());

        if (isNaN(loadDate.getTime())) {
            throw `Format Error: Posted date not found, ${loadDateStr}`;
        }

        return {
            company: company,
            phone: phone,
            originCity: originCity,
            originState: originState,
            originRegion: originRegion,
            destCity: destCity,
            destState: destState,
            destRegion: destRegion,
            position: position,
            loadDate: loadDate
        }
    }

    private addCompany(company: string) {
        //console.log(`Company: ${company}`);

        //return new Promise<string>((resolve, reject) => {
        //    var key = company.replace(/[\/|#|\.|\$|\[|\]]/g, '_');
        //    //console.log(key);

        //    MongoClient.connect("mongodb://pctodb:LolyzdFCO22sELCuxm0VepBMHdIBDgqb422p0XEjm8wwOju8HEh7kRUfFxQhjb3MrFx1Z8pbKHWTE0BUheFomQ==@pctodb.documents.azure.com:10255/?ssl=true", (err, db) => {
        //        db.close();
        //    });
        //    database.ref(`companies/${key}`)
        //        .set({
        //            name: company,
        //        })
        //        .then(() => resolve(key))
        //        .catch(error => reject(error));
        //});
    }

    private getCities(state) {
        //return new Promise<Array<string>>((resolve, reject) => {
        //    MongoClient.connect("mongodb://pctodb:LolyzdFCO22sELCuxm0VepBMHdIBDgqb422p0XEjm8wwOju8HEh7kRUfFxQhjb3MrFx1Z8pbKHWTE0BUheFomQ==@pctodb.documents.azure.com:10255/?ssl=true", (err, db) => {
        //        db.close();
        //    });
        //    database.ref(`states/${state}/cities`)
        //        .once("value")
        //        .then(snapshot => {
        //            var cities = new Array<string>();

        //            snapshot.forEach(item => {
        //                cities.push(item.val());
        //            });

        //            //console.log(cities);

        //            resolve(cities);
        //        }, error => reject(error));
        //});
    }

    private getStates() {
        //return new Promise<Array<string>>((resolve, reject) => {
        //    MongoClient.connect("mongodb://pctodb:LolyzdFCO22sELCuxm0VepBMHdIBDgqb422p0XEjm8wwOju8HEh7kRUfFxQhjb3MrFx1Z8pbKHWTE0BUheFomQ==@pctodb.documents.azure.com:10255/?ssl=true", (err, db) => {
        //        db.close();
        //    });
        //    database.ref("states")
        //        .once("value")
        //        .then(snapshot => {
        //            var states = new Array<string>();

        //            snapshot.forEach(item => {
        //                states.push(item.getKey());
        //            })

        //            //console.log(states);

        //            resolve(states);
        //        }, error => reject(error));
        //});
    }

    private getRegion(state) {
        //return new Promise<string>((resolve, reject) => {
        //    MongoClient.connect("mongodb://pctodb:LolyzdFCO22sELCuxm0VepBMHdIBDgqb422p0XEjm8wwOju8HEh7kRUfFxQhjb3MrFx1Z8pbKHWTE0BUheFomQ==@pctodb.documents.azure.com:10255/?ssl=true", (err, db) => {
        //        db.close();
        //    });
        //    database.ref(`states`)
        //        .orderByKey()
        //        .equalTo(state)
        //        .once("child_added")
        //        .then(snapshot => {
        //            //console.log(snapshot.val());
        //            resolve(snapshot.val().region);
        //        }, error => reject(error));
        //});
    }
}

var publisher = new Publisher();

export default publisher
