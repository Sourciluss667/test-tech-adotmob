import { InterestEvent, InterestPoint } from "./interfaces";
import { readFileSync } from 'fs';
import { csvFilepath } from './config';

/**
 * Use for already parsed csv file
 * Used if the .csv file don't change
 * @param points Points of interests (body of the request)
 * @param events Events (csv file)
 * @returns 
 */
function linkEventsToPoint(points: InterestPoint[], events: InterestEvent[]): InterestPoint[] {    
    const pointsLen = points.length;
    const eventsLen = events.length;
    let i;
    let j;
    let minDistance;
    let minPointIndex;

    // Initialize the points with 0 impressions and clicks
    for (i = 0; i < pointsLen; i++) {
        points[i].impressions = 0;
        points[i].clicks = 0;
    }

    // Add clicks and impressions to the nearest point of events
    for (i = 0; i < eventsLen; i++) {
        minDistance = Number.MAX_VALUE;
        minPointIndex = -1;

        // Loop through all points
        for (j = 0; j < pointsLen; j++) {
            // Calculate the distance between the event and the point
            const distance = Math.sqrt(Math.pow(points[j].lat - events[i].lat, 2) + Math.pow(points[j].lon - events[i].lon, 2));

            // If the distance is smaller than the minimum distance, update the minimum distance and the minimum point index
            if (distance < minDistance) {
                minDistance = distance;
                minPointIndex = j;
            }
        }

        // If the minimum point index is valid, add the event to the point
        if (minPointIndex >= 0) {
            if (events[i].event_type === 'imp') {
                points[minPointIndex].impressions++;
            } else {
                points[minPointIndex].clicks++;
            }
        }
    }

    return points;
}

/**
 * Use to parse directly csv file in this function and don't convert to object
 * Used for live data
 * @param points Points of interests (body of the request)
 * @returns
 */
function linkCsvToPoint(points: InterestPoint[]): InterestPoint[] {
    const pointsLen = points.length;
    let i;
    let j;
    let minDistance;
    let minPointIndex;

    // Initialize the points with 0 impressions and clicks
    for (i = 0; i < pointsLen; i++) {
        points[i].impressions = 0;
        points[i].clicks = 0;
    }


    const csvFile = readFileSync(csvFilepath, 'utf8');
    const csvRows = csvFile.split('\n');
    const csvRowsLen = csvRows.length;
    for (i = 0; i < csvRowsLen; i++) {
        minDistance = Number.MAX_VALUE;
        minPointIndex = -1;

        const event = csvRows[i].split(',');
        // 0: lat, 1: lon, 2: event_type

        // Loop through all points
        for (j = 0; j < pointsLen; j++) {
            // Calculate the distance between the event and the point
            const distance = Math.sqrt(Math.pow(points[j].lat - parseFloat(event[0]), 2) + Math.pow(points[j].lon - parseFloat(event[1]), 2));

            // If the distance is smaller than the minimum distance, update the minimum distance and the minimum point index
            if (distance < minDistance) {
                minDistance = distance;
                minPointIndex = j;
            }
        }

        // If the minimum point index is valid, add the event to the point
        if (minPointIndex >= 0) {
            if (event[2] === 'imp') {
                points[minPointIndex].impressions++;
            } else {
                points[minPointIndex].clicks++;
            }
        }
    }
    return points;
}

export { linkEventsToPoint, linkCsvToPoint };