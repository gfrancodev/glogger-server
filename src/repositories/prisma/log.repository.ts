import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaHelper } from "../../helpers/prisma.helper";
import { LogInterface } from "../../interfaces/log.interface";

@Injectable()
export class LogRepository implements LogInterface {
    constructor(
        private prisma: PrismaHelper
    ){}

    async create(data: Log.Data) {
        try {
            await this.prisma.log.create({ data: data as any })
        } catch (error) {
            throw new InternalServerErrorException('An error occurred while logging.')
        }
    }
}