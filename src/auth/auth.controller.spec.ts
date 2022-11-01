import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
    let controller: AuthController;
    let service: AuthService;

    beforeEach(async () => {
        const AuthServiceProvider = {
            provide: AuthService,
            useFactory: () => ({
                create: jest.fn(() => 4.5),
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService, AuthServiceProvider, JwtService],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        service = module.get<AuthService>(AuthService);
    });

    // it('should be defined', () => {
    //     expect(controller).toBeDefined();
    //     expect(service).toBeDefined();
    // })
    it('check create user', async () => {
        const result = {
            name: 'arsenii',
            id: 1,
            access_token: 'sdvsdv',
        };
        jest.spyOn(service, 'create').mockImplementation(async () => result);
        expect(await service.create({ name: result.name, password: '123' })).toBe(result);
    });
});
