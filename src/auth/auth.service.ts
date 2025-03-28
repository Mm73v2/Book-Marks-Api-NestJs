import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import { hash } from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
@Injectable()
class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    try {
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
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("This email is already in use");
        }
      }
      throw error;
    }
  }

  login() {}
}

export { AuthService };
