import {
    ExtractJwt,
    Strategy
} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { ENV } from 'src/env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: ENV.security.jwtSecret,
            ignoreExpiration: false,
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: any): Promise<string> {
        const { email, tokenType } = payload;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || tokenType !== 'access') {
            throw new UnauthorizedException();
        }
        return user.id;
    }
}