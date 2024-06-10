import { MessagePattern, Payload, EventPattern } from '@nestjs/microservices';
import { DroneService } from './drone.service';
import { MessageDroneDto } from './dto/message-drone-dto.dto';
import { TopicDroneDto } from './dto/topic-drone-dto.dto';
import { Controller, Get, Param, Post, Body, Sse } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('drone')
@Controller('drone')
export class DroneController {
  constructor(private readonly droneService: DroneService) {}

  @Post('subscribe')
  @ApiOperation({ description: 'to subscribe topic to get message', summary: 'subscribe topic' })
  async subscribeToTopic(@Body() body: TopicDroneDto): Promise<string> {
    this.droneService.subscribe(body.topic);
    return `Subscribed to topic ${body.topic}`;
  }
  
  @Post('publish')
  @ApiOperation({ description: 'to publish topic and message', summary: 'publish message to topic' })
  async publishToTopic(@Body() body: MessageDroneDto): Promise<string> {
    const message = JSON.stringify(body.message);
    this.droneService.publish(body.topic, message);
    return `Published message ${message} to topic ${body.topic}`;
  }
  
  @Post('latest')
  @ApiOperation({ description: 'to get latest message from topic in param', summary: 'get message' })
  getLatestMessage(@Body() body: TopicDroneDto) {
    const latestMessage = this.droneService.getLatestMessage(body.topic);
    console.log("had", latestMessage)
    if (latestMessage) {
      // return `Latest message on topic ${topic}: ${latestMessage}`;
      // const message = JSON.stringify(latestMessage);
      return latestMessage;
    } else {
      return `No message received on topic ${body.topic}`;
    }
  }
}
