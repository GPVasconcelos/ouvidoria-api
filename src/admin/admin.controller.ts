import {
  Controller,
  Get,
  UseGuards,
  Param,
  Patch,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('messages')
  getAll() {
    return this.adminService.getAllMessages();
  }

  @Get('messages/:id')
  getOne(@Param('id') id: string) {
    return this.adminService.getMessageById(id);
  }

  @Patch('messages/:id')
  update(
    @Param('id') id: string,
    @Body() body: { status: string; adminResponse?: string }
  ) {
    return this.adminService.updateMessage(id, body);
  }
}
