import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from '../types/RequestWithUser';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): number => {
    const request: RequestWithUser = ctx.switchToHttp().getRequest();
    return request.user.id;
  },
);
