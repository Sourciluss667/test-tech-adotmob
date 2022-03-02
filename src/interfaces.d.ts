// Interfaces
interface InterestPoint {
    name: string;
    lon: number;
    lat: number;
    impressions: number;
    clicks: number;
}

interface InterestEvent {
    lat: number;
    lon: number;
    event_type: string;
}

export { InterestPoint, InterestEvent };
