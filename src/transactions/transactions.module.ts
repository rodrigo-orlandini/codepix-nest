import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { Transaction } from "./entities/transaction.entity";

import { BankAccount } from "src/bank-accounts/entities/bank-account.entity";
import { PixKey } from "src/pix-keys/entities/pix-key.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([Transaction, BankAccount, PixKey]),
		ClientsModule.registerAsync([{
			name: "KAFKA_SERVICE",
			useFactory: (configService: ConfigService) => ({
				transport: Transport.KAFKA,
				options: {
					client: {
						brokers: [configService.get("KAFKA_BROKER")]
					}
				}
			}),
			inject: [ConfigService]
		}])
	],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
