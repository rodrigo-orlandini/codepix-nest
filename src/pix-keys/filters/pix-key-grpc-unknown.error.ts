import { Response } from "express";
import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

import { PixKeyGRPCUnknownError } from "../pix-keys.error";

@Catch(PixKeyGRPCUnknownError)
export class PixKeyGRPCUnknownErrorFilter implements ExceptionFilter {
	catch(exception: PixKeyGRPCUnknownError, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();

		response.status(500).json({
			statusCode: 500,
			message: exception.message
		});
	}
}