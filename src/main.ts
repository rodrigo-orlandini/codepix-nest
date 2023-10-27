import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
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

	await app.listen(3000);
}
bootstrap();
