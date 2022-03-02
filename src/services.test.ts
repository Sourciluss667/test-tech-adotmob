import { InterestEventClass } from './events';
import { InterestPoint, InterestEvent } from './interfaces';
import { linkEventsToPoint, linkCsvToPoint } from './services';

const events: InterestEventClass = new InterestEventClass();
const points: InterestPoint[] = [
    {
        lat: 48.8759992,
        lon: 2.3481253,
        name: 'Arc de triomphe',
    },
    {
        lat: 48.86,
        lon: 2.35,
        name: 'Chatelet'
    }
] as InterestPoint[];

/**
 * This test use default events.csv file to check result values
 */
test('Link events from pre-loaded event.csv', () => {
    events.loadEvents().then(ret => {
        expect(ret).toBe(true);
        const result = linkEventsToPoint(points, events.getEvents());
        expect(result).toBeTruthy();
        expect(result.length).toBe(2);
        expect(result[0].impressions).toBe(63593);
        expect(result[0].clicks).toBe(7646);
        expect(result[1].impressions).toBe(136407);
        expect(result[1].clicks).toBe(16348);
    });
});

/**
 * This test use default events.csv file to check result values
 */
test('Link events with live parsing of event.csv', () => {
    const result = linkCsvToPoint(points);
    expect(result).toBeTruthy();
    expect(result.length).toBe(2);
    expect(result[0].impressions).toBe(63593);
    expect(result[0].clicks).toBe(7646);
    expect(result[1].impressions).toBe(136407);
    expect(result[1].clicks).toBe(16348);
});