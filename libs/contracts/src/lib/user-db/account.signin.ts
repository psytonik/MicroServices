import {IsEmail, IsString} from "class-validator";

export namespace AccountSignIn {
  export const topic = 'account.signin.command';

  export class Request {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
  }

  export class Response {
    access_token: string;
  }
}

