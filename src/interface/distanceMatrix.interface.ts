export interface DistanceMatrix { 
    mode: string | 'foot'; 
    distance: number; 
    timeTaken: number;
}

export enum TransportMode  { 
    FOOT = 'foot',
    BIKE = 'bike',
    DRIVING = 'driving',
}


