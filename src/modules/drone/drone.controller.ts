import { MessagePattern, Payload, EventPattern } from '@nestjs/microservices';
import { DroneService } from './drone.service';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';


@Controller()
export class DroneController {
  constructor(private readonly droneService: DroneService) {}

  @Post('publish/:topic')
  publish(@Param('topic') topic: string, @Body() message: any) {
    return this.droneService.publish(topic, message);
  }

  @EventPattern('some/topic')
  handleTopicMessage(data: Record<string, unknown>) {
    console.log('Received message on topic "some/topic":', data);
  }

  @MessagePattern({ cmd: 'another/topic' })
  handleAnotherTopicMessage(data: Record<string, unknown>) {
    console.log('Received message on topic "another/topic":', data);
  }

}
