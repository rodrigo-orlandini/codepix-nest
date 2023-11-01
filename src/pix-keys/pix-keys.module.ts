import { join } from "node:path";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

import { PixKey } from "./entities/pix-key.entity";
import { BankAccount } from "src/bank-accounts/entities/bank-account.entity";

import { PixKeysService } from "./pix-keys.service";
import { PixKeysController } from "./pix-keys.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
	imports: [
		TypeOrmModule.forFeature([PixKey, BankAccount]),
		ClientsModule.registerAsync([{
			name: "PIX_PACKAGE",
			useFactory: (configService: ConfigService) => ({
				transport: Transport.GRPC,
				options: {
					url: configService.get("GRPC_URL"),
					package: "github.com.rodrigoorlandini.codepixgo",
					protoPath: join(__dirname, "proto", "pixkey.proto")
				}
			}),
			inject: [ConfigService]
		}])
	],
  controllers: [PixKeysController],
  providers: [PixKeysService]
})
export class PixKeysModule {}
