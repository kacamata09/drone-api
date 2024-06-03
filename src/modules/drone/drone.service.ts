import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { connect, MqttClient } from 'mqtt';
import { Observable, filter, fromEvent, map } from 'rxjs';


interface MqttMessage {
  topic: string;
  message: string;
}

const streamBuilder = (client: MqttClient) => {
  return client.stream;
};

const options = {
  host: 'mqtt://localhost',
  port: 1883,
};

@Injectable()
export class DroneService {

  private client: MqttClient;
  private latestMessages: Map<string, string> = new Map();

  constructor() {
    this.client = connect('mqtt://localhost:1883');

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('error', (error) => {
      console.error('MQTT client error:', error);
    });

    this.client.on('message', (topic, message) => {
      this.latestMessages.set(topic, message.toString());
    });
  }

  publish(topic: string, message: string): void {
    this.client.publish(topic, message);
  }

  subscribe(topic: string): void {
    this.client.subscribe(topic);
  }

  getLatestMessage(topic: string): string | undefined {
    return this.latestMessages.get(topic);
  }

}
