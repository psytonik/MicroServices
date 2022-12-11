import {Injectable} from '@nestjs/common';
import {UserRepository} from "../user/repositories/user.repository";
import {UserEntity} from "../user/entities/user.entity";
import {UserRole} from "@user-db/interfaces";
import {JwtService} from "@nestjs/jwt";
import {AccountSignIn, AccountSignUp} from "@user-db/contracts";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}
  async signUpAuthService({email, password, displayName}: AccountSignUp.Request): Promise<AccountSignUp.Response> {
    const oldUser = await this.userRepository.findUser(email);
    if(oldUser){
      throw new Error('User Already Exists');
    }
    const newUserEntity = await new UserEntity({
      displayName,
      email,
      passwordHash: '',
      role: UserRole.Customer
    }).setPassword(password);
    const newUser = await this.userRepository.createUser(newUserEntity);
    return {
      email: newUser.email
    }
  }
  async validateUser({email,password}:AccountSignIn.Request): Promise<{id:string}>{
    const user = await this.userRepository.findUser(email);
    if(!user){
      throw new Error('Wrong Login or Password')
    }
    const userEntity = await new UserEntity(user);
    const isCorrectPassword = await userEntity.validatePassword(password);
    if(!isCorrectPassword){
      throw new Error('Wrong Password')
    }
    return {id: user._id}
  }
  async signInAuthService(id:string): Promise<AccountSignIn.Response>{
    return {
      access_token: await this.jwtService.signAsync({id})
    }
  }
}
