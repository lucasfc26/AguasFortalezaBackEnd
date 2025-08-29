import { Module } from '@nestjs/common';
import { DistanceService } from './services/distance.service';

@Module({
  providers: [DistanceService],
  exports: [DistanceService],
})
export class SharedModule {}
