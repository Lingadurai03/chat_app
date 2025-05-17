import { IsNotEmpty, IsString } from 'class-validator';

export class SendFriendRequestDTO {
    @IsString()
    @IsNotEmpty()
    receiverId: string;
}
