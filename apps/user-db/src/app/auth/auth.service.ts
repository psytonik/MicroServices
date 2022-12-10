import {Injectable} from '@nestjs/common';
import {UserRepository} from "../user/repositories/user.repository";
import {UserEntity} from "../user/entities/user.entity";
import {UserRole} from "@user-db/interfaces";
import {JwtService} from "@nestjs/jwt";
import {SignInDto, SignUpDto} from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}
  async signUpAuthService({email, password, displayName}: SignUpDto): Promise<{email:string}> {
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
  async validateUser({email,password}:SignInDto): Promise<{id:string}>{
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
  async signInAuthService(id:string): Promise<{access_token:string}>{
    return {
      access_token: await this.jwtService.signAsync({id})
    }
  }
}
