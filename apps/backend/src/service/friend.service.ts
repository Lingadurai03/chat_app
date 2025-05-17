import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/service';

@Injectable()
export class FriendService {
    constructor(private prisma: PrismaService) {}

    async searchUsers(query: string, currentUserId: string) {
        return this.prisma.user.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            {
                                fullName: {
                                    contains: query,
                                    mode: 'insensitive',
                                },
                            },
                            { email: { contains: query, mode: 'insensitive' } },
                        ],
                    },
                    { id: { not: currentUserId } },
                ],
            },
            select: {
                id: true,
                fullName: true,
                email: true,
            },
        });
    }

    //  Send friend request
    async sendFriendRequest(senderId: string, receiverId: string) {
        if (senderId === receiverId) {
            throw new BadRequestException(
                'You cannot send a request to yourself',
            );
        }

        const receiver = await this.prisma.user.findUnique({
            where: { id: receiverId },
        });

        if (!receiver) {
            throw new NotFoundException('Receiver not found');
        }

        const existingRequest = await this.prisma.friendRequest.findFirst({
            where: {
                senderId,
                receiverId,
            },
        });

        if (existingRequest) {
            throw new BadRequestException('Friend request already sent');
        }

        return this.prisma.friendRequest.create({
            data: {
                senderId,
                receiverId,
            },
        });
    }

    // Accept friend request
    async acceptRequest(currentUserId: string, senderId: string) {
        const request = await this.prisma.friendRequest.findFirst({
            where: {
                senderId,
                receiverId: currentUserId,
            },
        });

        if (!request) {
            throw new NotFoundException('No friend request found');
        }

        await this.prisma.$transaction([
            this.prisma.friendRequest.delete({
                where: { id: request.id },
            }),
            this.prisma.friend.createMany({
                data: [
                    { userId: currentUserId, friendId: senderId },
                    { userId: senderId, friendId: currentUserId },
                ],
            }),
        ]);

        return { message: 'Friend request accepted' };
    }

    //  Get pending friend requests for current user
    async getPendingRequests(currentUserId: string) {
        return this.prisma.friendRequest.findMany({
            where: { receiverId: currentUserId },
            include: {
                sender: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                    },
                },
            },
        });
    }

    // Get UserFriend List

    async getFriendsList(userId: string) {
        return this.prisma.friend.findMany({
            where: { userId },
            include: {
                friend: {
                    select: {
                        id: true,
                        userName: true,
                        email: true,
                        fullName: true,
                    },
                },
            },
        });
    }
}
