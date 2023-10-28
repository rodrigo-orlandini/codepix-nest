import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
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

	app.connectMicroservice({
			transport: Transport.KAFKA,
			options: {
				client: {
					brokers: ["localhost:9094"]
				},
				consumer: {
					groupId: "transactions-consumer"
				}
			}
	});

	await app.startAllMicroservices();

	await app.listen(3000);
}
bootstrap();
