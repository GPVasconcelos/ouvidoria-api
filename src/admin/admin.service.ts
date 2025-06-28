import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  getAllMessages() {
    return this.prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
  }

  getMessageById(id: string) {
    return this.prisma.message.findUnique({ where: { id } });
  }

  updateMessage(id: string, data: any) {
    return this.prisma.message.update({
      where: { id },
      data,
    });
  }
}
