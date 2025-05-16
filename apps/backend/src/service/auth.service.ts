import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginDto, RegisterDto, UpdateAuthDto } from '@/dto';
import { PrismaService } from '@/service/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    async register(registerDto: RegisterDto) {
        const { userName, email, fullName, password } = registerDto;

        // Check if username or email already exists
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [{ userName }, { email }],
            },
        });

        if (existingUser) {
            throw new BadRequestException('Username or Email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in DB
        const user = await this.prisma.user.create({
            data: {
                userName,
                email,
                fullName,
                password: hashedPassword,
            },
        });

        return {
            id: user.id,
            userName: user.userName,
            email: user.email,
            fullName: user.fullName,
        };
    }

    async login(loginDto: LoginDto) {
        const { userNameOrEmail, password } = loginDto;

        // Find user by userName or email
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
            },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Compare password
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Login successful, return whatever you want (e.g., user info or token)
        return {
            id: user.id,
            userName: user.userName,
            email: user.email,
            fullName: user.fullName,
            // You can add JWT token here later if you implement auth tokens
        };
    }

    findAll() {
        return `This action returns all auth`;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
