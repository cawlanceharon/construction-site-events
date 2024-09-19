export interface Action {
    execute(data: any): Promise<void>;
}