import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
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
