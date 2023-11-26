import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TodosModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_DEV_STRING),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
