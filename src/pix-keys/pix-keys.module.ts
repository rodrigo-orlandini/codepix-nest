import { join } from "node:path";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PixKey } from "./entities/pix-key.entity";
import { BankAccount } from "src/bank-accounts/entities/bank-account.entity";

import { PixKeysService } from "./pix-keys.service";
import { PixKeysController } from "./pix-keys.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
	imports: [
		TypeOrmModule.forFeature([PixKey, BankAccount]),
		ClientsModule.register([{
			name: "PIX_PACKAGE",
			transport: Transport.GRPC,
			options: {
				url: "http://localhost:50051",
				package: "github.com.rodrigoorlandini.codepixgo",
				protoPath: join(__dirname, "proto", "pixkey.proto")
			}
		}])
	],
  controllers: [PixKeysController],
  providers: [PixKeysService]
})
export class PixKeysModule {}
