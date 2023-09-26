export interface LogInterface {
    create(data: Log.Data): Promise<void>
}