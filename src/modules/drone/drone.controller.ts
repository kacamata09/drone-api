import { MessagePattern, Payload, EventPattern } from '@nestjs/microservices';
import { DroneService } from './drone.service';
import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { Controller, Get, Param, Post, Body, Sse } from '@nestjs/common';

@Controller('drone')
export class DroneController {
  constructor(private readonly droneService: DroneService) {}

  @Post('publish/:topic')
  async publishToTopic(@Param('topic') topic: string, @Body() body: any): Promise<string> {
    const message = JSON.stringify(body);
    console.log(message)
    this.droneService.publish(topic, message);
    return `Published message ${message} to topic ${topic}`;
  }

  @Post('subscribe/:topic')
  async subscribeToTopic(@Param('topic') topic: string): Promise<string> {
    this.droneService.subscribe(topic);
    return `Subscribed to topic ${topic}`;
  }

  @Get(':topic/latest')
  getLatestMessage(@Param('topic') topic: string) {
    const latestMessage = this.droneService.getLatestMessage(topic);
    console.log("had", latestMessage)
    if (latestMessage) {
      return `Latest message on topic ${topic}: ${latestMessage}`;
    } else {
      return `No message received on topic ${topic}`;
    }
  }
}
