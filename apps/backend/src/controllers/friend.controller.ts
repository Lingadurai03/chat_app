import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Req,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';

import { SendFriendRequestDTO } from '@/dto';
import { JwtAuthGuard } from '@/guards';

import { FriendService } from '../service/friend.service';

@UseGuards(JwtAuthGuard)
@Controller('friend')
export class FriendController {
    constructor(private readonly friendService: FriendService) {}

    @Get('search')
    searchUsers(@Query('query') query: string, @Req() req) {
        return this.friendService.searchUsers(query, req.user.id);
    }

    @Post('request')
    sendFriendRequest(
        @Body(new ValidationPipe()) sendFriendRequestDTO: SendFriendRequestDTO,
        @Req() req,
    ) {
        return this.friendService.sendFriendRequest(
            req.user.id,
            sendFriendRequestDTO.receiverId,
        );
    }

    @Post('accept')
    acceptFriendRequest(@Body('senderId') senderId: string, @Req() req) {
        return this.friendService.acceptRequest(req.user.id, senderId);
    }

    @Get('pending')
    getPendingRequests(@Req() req) {
        return this.friendService.getPendingRequests(req.user.id);
    }

    @Get('friendsList')
    getFriendsList(@Req() req) {
        return this.friendService.getFriendsList(req.user.id);
    }
}
