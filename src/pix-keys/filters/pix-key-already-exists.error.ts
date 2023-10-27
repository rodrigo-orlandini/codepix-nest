import { Response } from "express";
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

import { PixKeyAlreadyExistsError } from "../pix-keys.error";

@Catch(PixKeyAlreadyExistsError)
export class PixKeyAlreadyExistsErrorFilter implements ExceptionFilter {
	catch(exception: PixKeyAlreadyExistsError, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();

		response.status(422).json({
			statusCode: 422,
			message: exception.message
		});
	}
}