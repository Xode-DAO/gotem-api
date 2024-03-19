import { Injectable } from '@nestjs/common';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { SetCaseNftDto } from './dto/set-case-nft.dto';
import { CaseNftEntity } from './entities/case-nft.entity';

@Injectable()
export class SmartContractCaseService {
  private wsProviderEndpoint = process.env.WS_PROVIDER;
  private wsProvider = new WsProvider(this.wsProviderEndpoint);
  private api = ApiPromise.create({ provider: this.wsProvider });

  private metadata: any = require("./../../../contract/case.json");
  private contractAddress = process.env.CASE_CONTRACT_ADDRESS;

  public async getAllCase(): Promise<CaseNftEntity[]> {
    return new Promise<CaseNftEntity[]>(async (resolve, reject) => {
      let caseNfts: CaseNftEntity[] = [];

      const api = await this.api;
      const contract = new ContractPromise(api, this.metadata, this.contractAddress);
      const options: any = {
        storageDepositLimit: null,
        gasLimit: api.registry.createType('WeightV2', api.consts.system.blockWeights['maxBlock']),
      };

      const { output } = (await contract.query['getAllCase'](this.contractAddress, options));
      if (output != null || output != undefined) {
        let data = JSON.parse(JSON.stringify(output))["ok"];
        if (data != null) {
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              caseNfts.push({
                title: data[i].title,
                description: data[i].description,
                category: data[i].category,
                owner: data[i].owner,
                bounty: data[i].bounty,
                file: data[i].file,
                status: data[i].status
              })
            }
          }
        }
      }

      resolve(caseNfts);
    });
  }

  public async getCaseById(id: number): Promise<CaseNftEntity> {
    return new Promise<CaseNftEntity>(async (resolve, reject) => {
      let caseNft: CaseNftEntity = undefined;

      const api = await this.api;
      const contract = new ContractPromise(api, this.metadata, this.contractAddress);
      const options: any = {
        storageDepositLimit: null,
        gasLimit: api.registry.createType('WeightV2', api.consts.system.blockWeights['maxBlock']),
      };

      const { output } = (await contract.query['getCaseById'](this.contractAddress, options, id));
      if (output != null || output != undefined) {
        let data = JSON.parse(JSON.stringify(output))["ok"];
        if (data != null) {
          caseNft = {
            title: data.title,
            description: data.description,
            category: data.category,
            owner: data.owner,
            bounty: data.bounty,
            file: data.file,
            status: data.status
          };
        }
      }

      resolve(caseNft);
    });
  }

  public async setCaseExtrinsic(data: SetCaseNftDto): Promise<any> {
    const api = await this.api;
    const contract = new ContractPromise(api, this.metadata, this.contractAddress);
    const options: any = {
      storageDepositLimit: null,
      gasLimit: api.registry.createType('WeightV2', {
        refTime: 129987,
        proofSize: 11990383647911208550,
      }),
    };

    const setCaseExtrinsic = contract.tx['setCase'](
      options, data
    );

    return setCaseExtrinsic
  }
}
