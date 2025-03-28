import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "src/auth/dto";
import { PrismaService } from "src/prisma/prisma.service";
import { hash, verify } from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable()
class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

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

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const jwtSecret = this.config.get("JWT_SECRET") as string;

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "15m",
      secret: jwtSecret,
    });

    return { access_token: token };
  }
}

export { AuthService };
