import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "src/auth/dto";

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
  async login(@Body() dto: AuthDto) {
    const user = await this.authService.login(dto);
    return user;
  }
}

export { AuthController };
