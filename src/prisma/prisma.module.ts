import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { PrismaClient } from "@prisma/client";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: "mysql://root:01124658176Zz!@localhost:3306/bookmarks?schema=public",
        },
      },
    });
  }
}
