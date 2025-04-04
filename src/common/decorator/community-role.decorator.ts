import { SetMetadata } from "@nestjs/common";

export const COMMUNITY_RULE_KEY = "community_rule";
export const RequiresCommunityAccess = () => SetMetadata(COMMUNITY_RULE_KEY, true);