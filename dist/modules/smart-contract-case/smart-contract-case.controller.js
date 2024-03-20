"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractCaseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const smart_contract_case_service_1 = require("./smart-contract-case.service");
const set_case_nft_dto_1 = require("./dto/set-case-nft.dto");
let SmartContractCaseController = class SmartContractCaseController {
    constructor(smartContractCaseService) {
        this.smartContractCaseService = smartContractCaseService;
    }
    getAllCase() {
        return this.smartContractCaseService.getAllCase();
    }
    getCaseById(id) {
        return this.smartContractCaseService.getCaseById(id);
    }
    setCaseExtrinsic(data) {
        return this.smartContractCaseService.setCaseExtrinsic(data);
    }
};
exports.SmartContractCaseController = SmartContractCaseController;
__decorate([
    (0, common_1.Get)('/get/all-case'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmartContractCaseController.prototype, "getAllCase", null);
__decorate([
    (0, common_1.Get)('/get/case/by-id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SmartContractCaseController.prototype, "getCaseById", null);
__decorate([
    (0, common_1.Post)('/extrinsic/set-case'),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Set case extrinsic created succesfully',
        type: set_case_nft_dto_1.SetCaseNftDto,
        isArray: false,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [set_case_nft_dto_1.SetCaseNftDto]),
    __metadata("design:returntype", Promise)
], SmartContractCaseController.prototype, "setCaseExtrinsic", null);
exports.SmartContractCaseController = SmartContractCaseController = __decorate([
    (0, common_1.Controller)('api/smart-contract/case'),
    (0, swagger_1.ApiTags)('smart contract - case'),
    __metadata("design:paramtypes", [smart_contract_case_service_1.SmartContractCaseService])
], SmartContractCaseController);
//# sourceMappingURL=smart-contract-case.controller.js.map