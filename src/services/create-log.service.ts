import { Inject, Injectable } from '@nestjs/common';
import { LogInterface } from 'src/interfaces/log.interface';

@Injectable()
export class CreateLogService {
  constructor(
    @Inject("Log")
    private readonly log: LogInterface
  ) {}

  async execute(data: Log.Data): Promise<void> {
    return await this.log.create(data)
  }
}
