import { InterestEvent } from './interfaces';
import { csvFilepath } from './config';
import { readFileSync } from 'fs';

class InterestEventClass {
    private _events: InterestEvent[] = [];

    constructor() {
    }

    public getEvents(): InterestEvent[] {
        return this._events;
    }

    public async loadEvents(): Promise<boolean> {
        try {
            this._events = [];
            // Read csv file with pure nodejs and add objects to the events array
            const csvFile = readFileSync(csvFilepath, 'utf8');
            const csvRows = csvFile.split('\n');
            const csvRowsLen = csvRows.length;
            // Jump the first line (csv headers)
            for (let i = 1; i < csvRowsLen; i++) {
                const csvRow = csvRows[i].split(',');
                if (csvRow.length !== 3) continue; // Skip invalid rows

                this._events.push({
                    lat: parseFloat(csvRow[0]),
                    lon: parseFloat(csvRow[1]),
                    event_type: csvRow[2],
                });
            }
            return true;
        } catch (error: unknown) {
            console.error(error);
            return false;
        }
    }
}

const events = new InterestEventClass();

export { InterestEventClass, events };