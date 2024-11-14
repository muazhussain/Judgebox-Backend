import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../enums/user-role.enum';

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);