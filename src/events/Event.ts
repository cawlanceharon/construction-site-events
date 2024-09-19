export interface Event {
    name: string;
    execute(data: any): Promise<void>;
}