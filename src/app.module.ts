import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { BankAccount } from "./bank-accounts/entities/bank-account.entity";
import { BankAccountsModule } from "./bank-accounts/bank-accounts.module";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			url: "postgresql://postgres:root@localhost:5433/codebank",
			// host: "localhost",
			// username: "development",
			// password: "development",
			// database: "development",
			// port: 5433,
			entities: [BankAccount],
			synchronize: true
		}),
		BankAccountsModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
