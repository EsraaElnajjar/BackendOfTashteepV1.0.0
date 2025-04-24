import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(userName: string, password: string) {
    const user = await this.userRepository.findOne({ where: { userName } });
  
    if (!user) {
      throw new UnauthorizedException('تسجيل الدخول فشل، تحقق من البيانات.');
    }
  
    console.log('Received Password:', password);
    console.log('Stored Password:', user.password);

    // لو كنت تستخدم التشفير bcrypt
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   throw new UnauthorizedException('كلمة المرور غير صحيحة.');
    // }

    // لو كلمة المرور غير مشفرة
    if (password !== user.password) {
      throw new UnauthorizedException('كلمة المرور غير صحيحة.');
    }

    const payload = { userName: user.userName, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return { 
      message: 'تم تسجيل الدخول بنجاح',
      role: user.role,
      name:user.userName,
      access_token: token,
    };
  }

  async addUser(userData: Partial<User>) {
    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
  
    return { message: 'تم إضافة المستخدم بنجاح', user: newUser };
  }
  

  // ===================== Get All Users =====================
  async getAllUsers() {
    return await this.userRepository.find();
  }

  // ===================== Edit User =====================
  async editUser(id: number, updateData: Partial<User>) {
    const user = await this.userRepository.findOne({ where: { id } });
  
    if (!user) {
      throw new NotFoundException('المستخدم غير موجود.');
    }
  
    // هنا لا نحتاج تشفير كلمة المرور، يتم الحفظ كما تم استلامه
    await this.userRepository.update(id, updateData);
    return { message: 'تم تعديل بيانات المستخدم بنجاح' };
  }
  
  // ===================== Delete User =====================
  async deleteUser(id: number) {
    const result = await this.userRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException('المستخدم غير موجود أو تم حذفه بالفعل.');
    }

    return { message: 'تم حذف المستخدم بنجاح' };
  }

}
