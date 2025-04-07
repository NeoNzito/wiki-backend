export class CommunityEntity {
    id: string;
    title: string;
    description: string;
    ownerId: string;
    owner: string;
    members: [];
    active: boolean;
    createdAt: string;
    updatedAt: string;
    posts: [];
}