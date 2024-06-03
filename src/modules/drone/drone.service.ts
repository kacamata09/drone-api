import { CreateDroneDto } from './dto/create-drone.dto';
import { UpdateDroneDto } from './dto/update-drone.dto';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, filter, fromEvent, map } from 'rxjs';

@Injectable()
export class DroneService {

  constructor(
    @Inject('MQTT_SERVICE') private readonly client: ClientProxy,
  ) {}

  publish(topic: string, message: any): Observable<any> {
    return this.client.send({ cmd: topic }, message);
  }

  onModuleInit() {
    this.client.connect();
  }

  subscribe(topic: string): Observable<any> {
    const mqttClient = (this.client as any).mqttClient;
    mqttClient.subscribe(topic);
    return fromEvent<[string, Buffer]>(mqttClient, 'message').pipe(
      filter(([receivedTopic]) => receivedTopic === topic),
      map(([receivedTopic, message]) => {
        if (!message) {
          throw new Error('Received undefined message');
        }
        return {
          topic: receivedTopic,
          message: message.toString(),
        };
      }),
    );
  }

}
