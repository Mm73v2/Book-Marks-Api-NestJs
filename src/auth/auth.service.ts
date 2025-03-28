import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
class AuthService {
  constructor(private prisma: PrismaService) {}
  signup() {}

  login() {}
}

export { AuthService };
