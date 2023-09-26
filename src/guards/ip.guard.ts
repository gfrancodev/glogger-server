import { Injectable, CanActivate, ExecutionContext, Inject, Logger } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { IPInterface } from 'src/interfaces/ip.interface';

@Injectable()
export class IpGuard extends ThrottlerGuard implements CanActivate {
 protected logger = new Logger(IpGuard.name)

 @Inject("IP")
 private readonly ip: IPInterface

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requestHttp = context.switchToHttp().getRequest();
    const requestWs = context.switchToWs().getClient()

    const ip = requestWs?.handshake?.address;

    const clientIp = requestHttp.ip ?? ip;

    const permittedIps = await this.ip.findAll();
    
    return permittedIps.includes(clientIp);
  }
}
