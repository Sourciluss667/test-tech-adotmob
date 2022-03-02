import { createServer } from 'http';
import { interestsStaticController, interestsLiveController } from './controllers';

const server = createServer((req, res) => {
    if (req.url === '/interests-static' && req.method === 'POST') {
        interestsStaticController(req, res);
    } else if (req.url === '/interests-live' && req.method === 'POST') {
        interestsLiveController(req, res);
    } else {
        // Default route
        console.log('Wrong route...');
        res.statusCode = 404;
        res.end('Wrong route...');
        return;
    }
});

export { server };