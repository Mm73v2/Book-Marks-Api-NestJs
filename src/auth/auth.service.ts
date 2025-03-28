import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "src/auth/dto";
import { PrismaService } from "src/prisma/prisma.service";
import { hash, verify } from "argon2";
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

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException("Credentials incorrect");
    }

    const passwordMatches = await verify(user.password, dto.password);

    if (!passwordMatches) {
      throw new ForbiddenException("Credentials incorrect");
    }

    const { password, ...rest } = user;
    return rest;
  }
}

export { AuthService };
