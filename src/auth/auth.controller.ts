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
  async signup(@Body() dto: AuthDto) {
    const user = await this.authService.signup(dto);
    return user;
  }

  @Post("login")
  login() {
    return "this is test";
  }
}

export { AuthController };
