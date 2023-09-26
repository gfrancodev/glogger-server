export interface IPInterface {
    findAll(): Promise<string[]>
    create(ip: string): Promise<void>
}