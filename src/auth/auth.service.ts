import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const admin = await this.prisma.admin.findUnique({ where: { username } });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return admin;
  }

  async login(data: { username: string; password: string }) {
    const admin = await this.validateUser(data.username, data.password);
    const payload = { sub: admin.id, username: admin.username };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
