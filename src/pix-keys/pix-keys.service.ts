import { lastValueFrom } from "rxjs";
import { Repository } from "typeorm";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";

import { PixKey, PixKeyKind } from "./entities/pix-key.entity";
import { BankAccount } from "src/bank-accounts/entities/bank-account.entity";

import { PixKeyFindResult } from "./pix-keys.grpc";
import { CreatePixKeyDto } from "./dto/create-pix-key.dto";

import { PixKeyAlreadyExistsError, PixKeyGRPCUnknownError } from "./pix-keys.error";

@Injectable()
export class PixKeysService implements OnModuleInit {
	private pixGRPCService: any;

	constructor(
		@InjectRepository(PixKey)
		private pixKeyRepository: Repository<PixKey>,

		@InjectRepository(BankAccount)
		private bankAccountRepository: Repository<BankAccount>,

		@Inject("PIX_PACKAGE")
		private pixGRPCPackage: ClientGrpc
	) { }

	onModuleInit() {
		this.pixGRPCService = this.pixGRPCPackage.getService("PixService");
	}

  async create(bankAccountId: string, createPixKeyDto: CreatePixKeyDto) {
		await this.bankAccountRepository.findOneOrFail({
			where: { id: bankAccountId }
		});

		const remotePixKey = await this.findRemotePixKey(createPixKeyDto);

		if(remotePixKey) {
			return this.createRemotePixKeyIfNotExists(bankAccountId, remotePixKey);
		}

		return this.pixKeyRepository.save({
			bank_account_id: bankAccountId,
			...createPixKeyDto
		});
  }

  findAll(bankAccountId: string) {
    return this.pixKeyRepository.find({
			where: { bank_account_id: bankAccountId },
			order: { created_at: "DESC" }
		});
  }

	private async createRemotePixKeyIfNotExists(bankAccountId: string, remotePixKey: PixKeyFindResult) {
		const hasLocalPixKey = await this.pixKeyRepository.exist({
			where: { key: remotePixKey.key }
		});

		if(hasLocalPixKey) {
			throw new PixKeyAlreadyExistsError();
		}

		return this.pixKeyRepository.save({
			id: remotePixKey.id,
			bank_account_id: bankAccountId,
			key: remotePixKey.key,
			kind: remotePixKey.kind as PixKeyKind
		});
	}
	
	private async findRemotePixKey(data: { key: string; kind: string }): Promise<PixKeyFindResult | null> {
		try {
			return await lastValueFrom(this.pixGRPCService.find(data));
		} catch(error) {
			console.log(error);

			if(error.details === "Pix Key was not found.") {
				return null;
			}

			throw new PixKeyGRPCUnknownError("GRPC Internal Error");
		}
	}
}