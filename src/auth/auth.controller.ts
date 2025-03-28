import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "src/dto";

@Controller("auth")
class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  @UsePipes(ValidationPipe)
  signup(@Body() dto: AuthDto) {
    console.log(dto);
    return "this is test";
  }

  @Post("login")
  login() {
    return "this is test";
  }
}

export { AuthController };
