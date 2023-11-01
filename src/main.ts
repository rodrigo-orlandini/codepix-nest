import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

import { AppModule } from "./app.module";

import { PixKeyAlreadyExistsErrorFilter } from "./pix-keys/filters/pix-key-already-exists.error";
import { PixKeyGRPCUnknownErrorFilter } from "./pix-keys/filters/pix-key-grpc-unknown.error";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalFilters(
		new PixKeyAlreadyExistsErrorFilter(),
		new PixKeyGRPCUnknownErrorFilter()
	);

	app.useGlobalPipes(new ValidationPipe({
		errorHttpStatusCode: 422
	}));

	const configService = app.get(ConfigService);

	app.connectMicroservice({
			transport: Transport.KAFKA,
			options: {
				client: {
					brokers: [configService.get("KAFKA_BROKER")]
				},
				consumer: {
					groupId: configService.get("KAFKA_CONSUMER_GROUP_ID")
				}
			}
	});

	await app.startAllMicroservices();

	await app.listen(process.env.PORT || 3000);
}
bootstrap();
