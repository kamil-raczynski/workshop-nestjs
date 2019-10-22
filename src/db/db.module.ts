import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './db-ormconfig.constant';
import { DbService } from './db.service';

@Module({
  imports: [TypeOrmModule.forRoot(getOrmConfig())],
  exports: [],
  providers: [DbService],
})
export class DbModule {}
