import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";


@WebSocketGateway({ cors: true })
export class CommunityGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private users = new Map<string, string>();

    handleDisconnect(client: any) {
    }

    handleConnection(client: any, ...args: any[]) {
    }

    @SubscribeMessage("subscribeToCommunity")
    handleSubscribe(client: Socket, userId: string) {
        this.users.set(client.id, userId);
    }

    sendComment(userId: string, message: string) {
        for (const [clientId, storedUserId] of this.users.entries()) {
            if (storedUserId === userId) {
                this.server.to(clientId).emit('newComment', message);
            }
        }
    }
}