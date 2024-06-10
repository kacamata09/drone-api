import { MessageDroneDto } from './dto/message-drone-dto.dto';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { connect, MqttClient } from 'mqtt';
import { Observable, filter, fromEvent, map } from 'rxjs';


interface MqttMessage {
  topic: string;
  message: string;
}

@Injectable()
export class DroneService {

  private client: MqttClient;
  private latestMessages: Map<string, string> = new Map();

  constructor() {
    this.client = connect('mqtt://test.mosquitto.org:1883');

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('error', (error) => {
      console.error('MQTT client error:', error);
    });

    this.client.on('message', (topic, message) => {
      console.log(message, 'hhhhhh')
      this.latestMessages.set(topic, message.toString());
    });
  }

  publish(topic: string, message: string): void {
    this.client.publish(topic, message);
  }

  subscribe(topic: string): void {
    this.client.subscribe(topic);
    console.log("sudah subscrib")
  }

  getLatestMessage(topic: string): string | undefined {
    return this.latestMessages.get(topic);
  }

}
