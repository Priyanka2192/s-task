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
const RolePermission_1 = __importDefault(require("../model/RolePermission"));
const Permission_1 = __importDefault(require("../model/Permission"));
const verifyRoles = (permName) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("In verifyRoles");
            const roleId = req.body.user_role_id;
            const data = yield Permission_1.default.findOne({ where: { perm_name: permName } });
            const data1 = yield RolePermission_1.default.findOne({ where: { role_id: roleId, perm_id: data === null || data === void 0 ? void 0 : data.id } });
            if (data1 === null) {
                res.status(403).json({ 'message': 'No permission to execute this action.' });
            }
            else {
                next();
            }
        }
        catch (err) {
            console.error('Error in verifyRoles : ' + err.message);
        }
    });
};
exports.default = verifyRoles;
