import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty({ message: 'Username should not be empty' })
    userName: string;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty({ message: 'Email should not be empty' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'FullName should not be empty' })
    fullName: string;

    @IsString()
    @IsNotEmpty({ message: 'Password should not be empty' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}
