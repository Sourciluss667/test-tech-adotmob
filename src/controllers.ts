import { IncomingMessage, ServerResponse } from 'http';
import { InterestPoint } from './interfaces';
import { events } from './events';
import { linkCsvToPoint, linkEventsToPoint } from './services';

function interestsStaticController(req: IncomingMessage, res: ServerResponse): void {
    // Points of interests route
    // Check content-type for valid JSON
    if (req.headers['content-type'] !== 'application/json') {
        console.log('Invalid content-type');
        res.statusCode = 400;
        res.end('Invalid content-type');
        return;
    }

    // Check body for valid data
    const body: Uint8Array[] = [];
    req.on('data', (chunk) => {
        // Get the body of the request
        body.push(chunk);
    }).on('end', () => {
        // Parse body
        const parsedBodyJSON: InterestPoint[] = JSON.parse(Buffer.concat(body).toString());

        // Check if it's an array of objects
        if (Object.prototype.toString.call(parsedBodyJSON) !== '[object Array]' || parsedBodyJSON.length === 0) {
            console.log('Invalid JSON');
            res.statusCode = 400;
            res.end('Invalid JSON');
            return;
        }

        // Call the function to process the points of interest
        const points = linkEventsToPoint(parsedBodyJSON, events.getEvents());

        res.statusCode = 200;
        res.end(JSON.stringify(points));
        return;
    });
    return;
}

function interestsLiveController(req: IncomingMessage, res: ServerResponse): void {
    // Points of interests route
    // Check content-type for valid JSON
    if (req.headers['content-type'] !== 'application/json') {
        console.log('Invalid content-type');
        res.statusCode = 400;
        res.end('Invalid content-type');
        return;
    }

    // Check body for valid data
    const body: Uint8Array[] = [];
    req.on('data', (chunk) => {
        // Get the body of the request
        body.push(chunk);
    }).on('end', () => {
        // Parse body
        const parsedBodyJSON: InterestPoint[] = JSON.parse(Buffer.concat(body).toString());

        // Check if it's an array of objects
        if (Object.prototype.toString.call(parsedBodyJSON) !== '[object Array]' || parsedBodyJSON.length === 0) {
            console.log('Invalid JSON');
            res.statusCode = 400;
            res.end('Invalid JSON');
            return;
        }

        // Call the function to process the points of interest
        const points = linkCsvToPoint(parsedBodyJSON);

        res.statusCode = 200;
        res.end(JSON.stringify(points));
        return;
    });
    return;
}

export { interestsStaticController, interestsLiveController };