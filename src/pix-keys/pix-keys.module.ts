import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PixKey } from "./entities/pix-key.entity";
import { BankAccount } from "src/bank-accounts/entities/bank-account.entity";
import { PixKeysService } from "./pix-keys.service";
import { PixKeysController } from "./pix-keys.controller";

@Module({
	imports: [TypeOrmModule.forFeature([PixKey, BankAccount])],
  controllers: [PixKeysController],
  providers: [PixKeysService]
})
export class PixKeysModule {}
