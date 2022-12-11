import {Body, Controller, Post, UnauthorizedException} from '@nestjs/common';
import {AccountSignIn, AccountSignUp} from '@user-db/contracts'
import {RMQService} from "nestjs-rmq";
import {SignInDto} from "../dto/signIn.dto";
import {SignUpDto} from "../dto/signUp.dto";

@Controller('auth')
export class AuthController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly rmqService: RMQService) {}
  @Post('signup')
  async signUp(@Body() dto: SignUpDto){
    try {
      return await this.rmqService.send<AccountSignUp.Request, AccountSignUp.Response>(AccountSignUp.topic,dto);
    } catch (error) {
      if(error instanceof Error) {
        console.error(error.message)
        throw new UnauthorizedException(error.message)
      }
    }
  }
  @Post('sign-in')
  async signIn(@Body() dto: SignInDto): Promise<AccountSignIn.Response>{
    try {
      return await this.rmqService.send<AccountSignIn.Request, AccountSignIn.Response>(AccountSignIn.topic,dto);
    } catch (error) {
      if(error instanceof Error) {
        throw new UnauthorizedException(error.message)
      }
    }
  }
}


