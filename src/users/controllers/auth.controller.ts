import {
    Body,
    Controller,
    Post,
    Res,
    UseGuards
} from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { ApiTags } from "@nestjs/swagger";
import { RegisterDto } from "../dtos/register.dto";
import { LoginDto } from "../dtos/login.dto";
import { commonResponse } from "src/utils/common-response";
import { Response } from 'express';
import { JwtGuard } from "../guards/jwt.guard";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<any> {
        try {
            const data = await this.usersService.register(registerDto);
            return commonResponse(true, 'User registered successfully', data);
        } catch (error) {
            return commonResponse(false, 'User registration failed', error);
        }
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response): Promise<any> {
        try {
            const { accessToken, refreshToken, csrfToken } = await this.usersService.login(loginDto);
            // response.cookie('csrf_token', csrfToken, {
            //     httpOnly: false,
            //     secure: true,
            //     sameSite: 'strict',
            // });
            // response.cookie('refresh_token', refreshToken, {
            //     httpOnly: true,
            //     secure: true,
            //     sameSite: 'strict',
            // });
            return commonResponse(true, 'User logged in successfully', { accessToken, refreshToken });
        } catch (error) {
            return commonResponse(false, 'User login failed', error);
        }
    }

    @Post('logout')
    @UseGuards(JwtGuard)
    async logout(@Res({ passthrough: true }) response: Response) {
        try {
            response.clearCookie('csrf_token');
            response.clearCookie('refresh_token');
            return commonResponse(true, 'User logged out successfully');
        } catch (error) {
            return commonResponse(false, 'User logout failed', error);
        }
    }
}