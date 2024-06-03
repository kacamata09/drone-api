import { MessagePattern, Payload, EventPattern } from '@nestjs/microservices';
import { DroneService } from './drone.service';
import { MessageDroneDto } from './dto/message-drone-dto.dto';
import { Controller, Get, Param, Post, Body, Sse } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('drone')
@Controller('drone')
export class DroneController {
  constructor(private readonly droneService: DroneService) {}

  @Post('subscribe/:topic')
  @ApiOperation({ description: 'to subscribe topic to get message', summary: 'subscribe topic' })
  async subscribeToTopic(@Param('topic') topic: string): Promise<string> {
    this.droneService.subscribe(topic);
    return `Subscribed to topic ${topic}`;
  }
  
  @Post('publish/:topic')
  @ApiOperation({ description: 'to publish topic and message', summary: 'publish message to topic' })
  async publishToTopic(@Param('topic') topic: string, @Body() body: MessageDroneDto): Promise<string> {
    const message = JSON.stringify(body);
    console.log(message)
    this.droneService.publish(topic, message);
    return `Published message ${message} to topic ${topic}`;
  }

  @Get(':topic/latest')
  @ApiOperation({ description: 'to get latest message from topic in param', summary: 'get message' })
  getLatestMessage(@Param('topic') topic: string) {
    const latestMessage = this.droneService.getLatestMessage(topic);
    console.log("had", latestMessage)
    if (latestMessage) {
      // return `Latest message on topic ${topic}: ${latestMessage}`;
      return latestMessage;
    } else {
      return `No message received on topic ${topic}`;
    }
  }
}
