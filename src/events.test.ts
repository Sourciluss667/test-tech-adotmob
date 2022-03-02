import { InterestEventClass } from './events';

const events: InterestEventClass = new InterestEventClass();

test('Loading events', () => {
    events.loadEvents().then(ret => {
        expect(ret).toBe(true);
    })
});

// A little long but check all the lines to be sure
test('Get events', () => {
    const e = events.getEvents();
    expect(e).toBeTruthy();
    expect(e.length).toBeGreaterThan(0);
    for (const event of e) {
        expect(event.lat).toBeTruthy();
        expect(event.lon).toBeTruthy();
        expect(event.event_type === 'imp' || event.event_type === 'click').toBe(true);
    }
});