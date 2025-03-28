import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signup(@Body() dto: any) {
    console.log(dto);
    return "this is test";
  }

  @Post("login")
  login() {
    return "this is test";
  }
}

export { AuthController };
