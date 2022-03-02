import { server } from './server';
import { port } from './config';
import { events } from './events';

async function main() {
    // Loading events
    // console.time('Loading events');
    if (await events.loadEvents()) {
        console.log('Events loaded');
    } else {
        console.error('Error loading events');
        return;
    }
    // console.timeEnd('Loading events');

    // Launch server
    server.listen(port, () => {
        console.log(`Server is running on port :${port}`);
    });
}

main();
