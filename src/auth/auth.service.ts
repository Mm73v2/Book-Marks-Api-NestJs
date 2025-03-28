import { Injectable } from "@nestjs/common";
import { AuthDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import { hash } from "argon2";
@Injectable()
class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const hashedPassword = await hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        createdAt: true,
        email: true,
        updatedAt: true,
        firstName: true,
        lastName: true,
      },
    });

    return user;
  }

  login() {}
}

export { AuthService };
