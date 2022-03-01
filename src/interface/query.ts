export interface QueryRequest {
    time_requested: Date;
    building_start: string; 
    building_destination: string;
}

export interface QueryResponse { 
    distance: number; 
    time_taken: number; 
}