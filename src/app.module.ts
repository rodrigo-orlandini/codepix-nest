import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { BankAccount } from "./bank-accounts/entities/bank-account.entity";
import { BankAccountsModule } from "./bank-accounts/bank-accounts.module";
import { PixKey } from "./pix-keys/entities/pix-key.entity";
import { PixKeysModule } from "./pix-keys/pix-keys.module";
import { TransactionsModule } from "./transactions/transactions.module";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			url: "postgresql://postgres:root@localhost:5433/codebank",
			entities: [BankAccount, PixKey],
			synchronize: true
		}),
		BankAccountsModule,
		PixKeysModule,
		TransactionsModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
