import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Query,
    Request,
    UseGuards
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { commonResponse } from 'src/utils/common-response';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUsersDto } from '../dtos/get-users.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRoles } from '../enums/user-role.enum';
import { JwtGuard } from '../guards/jwt.guard';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get('all')
    @Roles(UserRoles.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    async getUsers(@Query() getUsersDto: GetUsersDto) {
        try {
            const data = await this.usersService.getUsers(getUsersDto);
            return commonResponse(true, 'Get users successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get users failed', error);
        }
    }

    @Get()
    @UseGuards(JwtGuard)
    async getUser(@Request() request: any): Promise<any> {
        try {
            const data = await this.usersService.getUser(request);
            return commonResponse(true, 'Get user successfully', data);
        } catch (error) {
            return commonResponse(false, 'Get user failed', error);
        }
    }

    @Patch()
    @UseGuards(JwtGuard)
    async updateUser(@Request() request: any, @Body() updateUserDto: UpdateUserDto): Promise<any> {
        try {
            const data = await this.usersService.updateUser(request, updateUserDto);
            return commonResponse(true, 'Update user successfully', data);
        } catch (error) {
            return commonResponse(false, 'Update user failed', error);
        }
    }

    @Delete()
    @UseGuards(JwtGuard)
    async deleteUser(@Request() request: any): Promise<any> {
        try {
            const data = await this.usersService.deleteUser(request);
            return commonResponse(true, 'Delete user successfully', data);
        } catch (error) {
            return commonResponse(false, 'Delete user failed', error);
        }
    }
}
