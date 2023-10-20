import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { BankAccount } from "./entities/bank-account.entity";
import { CreateBankAccountDto } from "./dto/create-bank-account.dto";

@Injectable()
export class BankAccountsService {
	constructor(
		@InjectRepository(BankAccount)
		private bankAccountRepository: Repository<BankAccount>
	) {}

	create(createBankAccountDto: CreateBankAccountDto) {
		return this.bankAccountRepository.save(createBankAccountDto);
	}

	findAll() {
		return this.bankAccountRepository.find();
	}

	findOne(id: string) {
		return this.bankAccountRepository.findOneOrFail({
			where: { id }
		});
	}
}
