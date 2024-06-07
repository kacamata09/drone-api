import { Module } from '@nestjs/common';
import { DroneService } from './drone.service';
import { DroneController } from './drone.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          // url: 'mqtt://127.0.0.1:1883',
          url: 'mqtt://test.mosquitto.org:1883',
        },
      },
    ]),
  ],
  controllers: [DroneController],
  providers: [DroneService]
})
export class DroneModule {}
