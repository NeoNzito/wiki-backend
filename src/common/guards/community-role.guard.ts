import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { COMMUNITY_RULE_KEY } from "../decorator/community-role.decorator";
import { Request } from "express";
import { CommunityService } from "src/ms-community/community.service";

@Injectable()
export class CommunityRoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly communityService: CommunityService
    ) {}


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isProtected = this.reflector.get<boolean>(
          COMMUNITY_RULE_KEY,
          context.getHandler(),  
        );

        if (!isProtected) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();
        const user = request.user;
        const communityId = request.params.communityId;

        const hasAccess = await this.communityService.checkUserAccess(user.id, communityId);

        if (!hasAccess) {
            throw new ForbiddenException("You must be subscribed or the owner to post in this community.");
        }

        return true;
    }
    
}