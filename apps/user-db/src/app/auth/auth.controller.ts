import {Body, Controller} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AccountSignIn, AccountSignUp} from '@user-db/contracts'
import {RMQRoute, RMQValidate} from "nestjs-rmq";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @RMQRoute(AccountSignUp.topic)
  @RMQValidate()
  async signUp(@Body() dto: AccountSignUp.Request):Promise<AccountSignUp.Response>{
    return this.authService.signUpAuthService(dto);
  }
  @RMQRoute(AccountSignIn.topic)
  @RMQValidate()
  async signIn(@Body() {email,password}: AccountSignIn.Request): Promise<AccountSignIn.Response>{
    const {id} = await this.authService.validateUser({email, password});
    return this.authService.signInAuthService(id);
  }
}


