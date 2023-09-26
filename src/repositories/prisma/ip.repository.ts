import { Injectable } from "@nestjs/common";
import { PrismaHelper } from "../../helpers/prisma.helper";

@Injectable()
export class IPRepository {
  constructor(private readonly prisma: PrismaHelper) {}

  async findAll(): Promise<string[]> {
    const permittedIps = await this.prisma.allow.findMany();
    return permittedIps.map((ip) => ip.address);
  }

  async create(address: string): Promise<void> {
    await this.prisma.allow.create({
      data: {
        address: address,
      },
    });
  }
}