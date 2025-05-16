import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto, RegisterDto } from '@/dto';
import { PrismaService } from '@/service/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) {}

    async register(registerDto: RegisterDto) {
        const { userName, email, fullName, password } = registerDto;

        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [{ userName }, { email }],
            },
        });

        if (existingUser) {
            throw new BadRequestException('Username or Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                userName,
                email,
                fullName,
                password: hashedPassword,
            },
        });

        const tokens = await this.generateTokens(user);
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return {
            user: {
                id: user.id,
                userName: user.userName,
                email: user.email,
                fullName: user.fullName,
            },
            ...tokens,
        };
    }

    async login(loginDto: LoginDto) {
        const { userNameOrEmail, password } = loginDto;

        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
            },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const tokens = await this.generateTokens(user);
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return {
            user: {
                id: user.id,
                userName: user.userName,
                email: user.email,
                fullName: user.fullName,
            },
            ...tokens,
        };
    }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch ? user : null;
    }

    async generateTokens(user: { email: string; id: string }) {
        const payload = { email: user.email, sub: user.id };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_SECRET!,
            expiresIn: '1h',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN_SECRET!,
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    }

    async updateRefreshToken(userId: string, refreshToken: string | null) {
        const hashed = refreshToken
            ? await bcrypt.hash(refreshToken, 10)
            : null;

        return this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken: hashed },
        });
    }

    async refreshToken(oldToken: string) {
        try {
            const payload = this.jwtService.verify(oldToken, {
                secret: process.env.REFRESH_TOKEN_SECRET!,
            });

            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            });

            if (!user || !user.refreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const isMatch = await bcrypt.compare(oldToken, user.refreshToken);
            if (!isMatch)
                throw new UnauthorizedException('Invalid refresh token');

            const tokens = await this.generateTokens(user);
            await this.updateRefreshToken(user.id, tokens.refreshToken);

            return tokens;
        } catch (_err) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async logout(userId: string) {
        await this.updateRefreshToken(userId, null);
        return { message: 'Logged out' };
    }
}
