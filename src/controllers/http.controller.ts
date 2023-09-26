import { Body, Controller, Logger, Put, UseGuards, UseInterceptors, HttpCode } from '@nestjs/common';
import { CreateLogDTO } from '../dtos/create-log.dto';
import { IpGuard } from '../guards/ip.guard';
import { CreateLogService } from '../services/create-log.service';
import { ApiTags, ApiOperation, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger'; // Import Swagger decorators

@Controller()
@ApiTags('Logs') 
export class HTTPController {
  protected logger = new Logger(HTTPController.name);

  constructor(private readonly createLogService: CreateLogService) {}

  @UseGuards(IpGuard)
  @UseInterceptors()
  @HttpCode(200)
  @Put('/capture')
  @ApiOperation({ summary: 'Create a log entry' }) 
  @ApiOkResponse({ description: 'Log entry created successfully' }) 
  @ApiBadRequestResponse({ description: 'Bad request' }) 
  async create(@Body() data: CreateLogDTO): Promise<void> {
    this.logger.debug(JSON.parse(JSON.stringify(data)));
    return await this.createLogService.execute(data);
  }
}
