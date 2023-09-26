/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger, UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  WsResponse,
} from '@nestjs/websockets';
import { from, map, Observable } from 'rxjs';
import { Server } from 'socket.io';
import { IpGuard } from '../guards/ip.guard';
import { CreateLogService } from '../services/create-log.service';

@WebSocketGateway(3005, {
  namespace: 'capture',
  transports: ['websocket', 'polling'],
  cors: { origin: '*' },
})
export class WSController {
  @WebSocketServer()
  protected server: Server;
  protected logger = new Logger(WSController.name);

  constructor(private readonly createlogService: CreateLogService) {}

  @UseGuards(IpGuard)
  @SubscribeMessage('capture')
  async onCreate(@MessageBody() data: Log.Data): Promise<Observable<WsResponse<number>>> {
    await this.createlogService.execute(data)
    return from([1, 2, 3]).pipe(map((data) => ({ event: 'register', data })));
  }
}