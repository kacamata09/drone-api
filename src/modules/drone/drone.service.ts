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

// Define the streamBuilder function
const streamBuilder = (client: MqttClient) => {
  return client.stream;
};

// Define the options for the MQTT client
const options = {
  // Provide your MQTT broker URL and other options as needed
  host: 'mqtt://localhost',
  port: 1883,
};

@Injectable()
export class DroneService {

  private client: MqttClient;
  private latestMessages: Map<string, string> = new Map();

  constructor() {
    // Define the streamBuilder function
    const streamBuilder = (client: MqttClient) => {
      return client.stream;
    };

    // Define the options for the MQTT client
    const options = {
      // Provide your MQTT broker URL and other options as needed
      host: 'mqtt://localhost',
      port: 1883,
    };

    // Create a new MQTT client
    // this.client = connect(options, { streamBuilder });
    this.client = connect('mqtt://localhost:1883');

    // Handle events
    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('error', (error) => {
      console.error('MQTT client error:', error);
    });

    // Listen for incoming messages
    this.client.on('message', (topic, message) => {
      // Update latest message for the topic
      this.latestMessages.set(topic, message.toString());
    });
  }

  // Example method for publishing a message
  publish(topic: string, message: string): void {
    this.client.publish(topic, message);
  }

  // Example method for subscribing to a topic
  subscribe(topic: string): void {
    this.client.subscribe(topic);
  }

  // Method to get the latest message for a topic
  getLatestMessage(topic: string): string | undefined {
    return this.latestMessages.get(topic);
  }

}
