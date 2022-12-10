import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SignInDto, SignUpDto} from "./dto/auth.dto";


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @Post('signup')
  async signUp(@Body() dto: SignUpDto){
    return this.authService.signUpAuthService(dto);
  }
  @Post('signin')
  async signIn(@Body() {email,password}: SignInDto){
    const {id} = await this.authService.validateUser({email, password});
    return this.authService.signInAuthService(id);
  }
}

