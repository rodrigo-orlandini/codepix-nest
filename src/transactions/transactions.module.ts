import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { Transaction } from "./entities/transaction.entity";

import { BankAccount } from "src/bank-accounts/entities/bank-account.entity";
import { PixKey } from "src/pix-keys/entities/pix-key.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([Transaction, BankAccount, PixKey]),
		ClientsModule.register([{
			name: "KAFKA_SERVICE",
			transport: Transport.KAFKA,
			options: {
				client: {
					brokers: ["localhost:9094"]
				}
			}
		}])
	],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
