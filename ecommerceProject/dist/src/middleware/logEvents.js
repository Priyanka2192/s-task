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
const path = require("path");
const fs_1 = __importDefault(require("fs"));
const fsPromises = require('fs').promises;
const date_fns_1 = require("date-fns");
const { v4: uuid } = require('uuid');
const logEvents = (message, logName) => __awaiter(void 0, void 0, void 0, function* () {
    const dateTime = `${(0, date_fns_1.format)(new Date(), 'dd-MM-yyyy \t HH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    try {
        if (!fs_1.default.existsSync(path.join(__dirname, '..', 'logs'))) {
            yield fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        yield fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    }
    catch (err) {
        console.error(err.message);
    }
});
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'requestLog.txt');
    next();
};
module.exports = { logger, logEvents };
