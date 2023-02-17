"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("./src/model/Product"));
const User_1 = __importDefault(require("./src/model//User"));
const Order_1 = __importDefault(require("./src/model//Order"));
const Role_1 = __importDefault(require("./src/model/Role"));
const RolePermission_1 = __importDefault(require("./src/model/RolePermission"));
const Permission_1 = __importDefault(require("./src/model/Permission"));
const syncAllTables = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Product_1.default.sync().then(() => {
        console.log('Product table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
    yield User_1.default.sync().then(() => {
        console.log('User table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
    yield Role_1.default.sync().then(() => {
        console.log('Role table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
    yield Permission_1.default.sync().then(() => {
        console.log('Permission table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
    yield RolePermission_1.default.sync().then(() => {
        console.log('RolePermission table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
    yield Order_1.default.sync().then(() => {
        console.log('Order table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });
});
exports.default = syncAllTables;
