"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TornadoEventsDB = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
var IndexedDB_1 = __importDefault(require("./IndexedDB"));
var types_1 = require("../types");
var index_1 = require("./index");
var TornadoEventsDB = /** @class */ (function (_super) {
    __extends(TornadoEventsDB, _super);
    function TornadoEventsDB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * getDepositTableName
     *
     * @param network The current network
     * @param param1 The destructured currency/amount pair
     * @returns The string formatted deposits store specified instance
     */
    TornadoEventsDB.prototype.getDepositTableName = function (network, _a) {
        var currency = _a.currency, amount = _a.amount;
        return "deposits-".concat(network, "-").concat(currency, "-").concat(amount);
    };
    /**
     * getWithdrawalTableName
     *
     * @param network The current network
     * @param param1 The destructured currency/amount pair
     * @returns The string formatted withdrawal store specified instance
     */
    TornadoEventsDB.prototype.getWithdrawalTableName = function (network, _a) {
        var currency = _a.currency, amount = _a.amount;
        return "withdrawals-".concat(network, "-").concat(currency, "-").concat(amount);
    };
    /**
     * getStoreInstance
     *
     * @param eventType The event type
     * @param network The current network
     * @param pair The currency/amount pair
     * @returns The string formatted specified instance
     */
    TornadoEventsDB.prototype.getStoreInstanceName = function (eventType, network, pair) {
        return eventType === index_1.TornadoEvents.DEPOSIT
            ? this.getDepositTableName(network, pair)
            : this.getWithdrawalTableName(network, pair);
    };
    /**
     * getLastQueriedBlock
     *
     * @param eventType The event type
     * @param network The current network
     * @param pair The currency/amount pair
     * @returns The specified instance last queried block
     */
    TornadoEventsDB.prototype.getLastQueriedBlock = function (eventType, network, pair) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = this.getStoreInstanceName(eventType, network, pair);
                        return [4 /*yield*/, this.getValue("lastEvents", instance)];
                    case 1:
                        value = (_a.sent());
                        if (!!value) return [3 /*break*/, 3];
                        value = { instance: instance, lastQueriedBlock: 0 };
                        return [4 /*yield*/, this.putValue("lastEvents", value)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, value.lastQueriedBlock];
                }
            });
        });
    };
    /**
     * It returns the last leaf index from the specified deposit events list
     *
     * @param network The current network
     * @param pair The currency/amount pair
     * @returns The specified instance last leaf index
     */
    TornadoEventsDB.prototype.getLastLeafIndex = function (network, pair) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, cursor, leafIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = this.getDepositTableName(network, pair);
                        return [4 /*yield*/, this.getIndexCursor(instance)];
                    case 1:
                        cursor = _a.sent();
                        if (!cursor) {
                            return [2 /*return*/, 0];
                        }
                        leafIndex = __assign({}, cursor.value).leafIndex;
                        return [2 /*return*/, leafIndex];
                }
            });
        });
    };
    TornadoEventsDB.prototype.getLastEventIndex = function (eventType, network, pair) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this.getStoreInstanceName(eventType, network, pair);
                return [2 /*return*/, this.countAllValues(instance)];
            });
        });
    };
    /**
     * updateLastQueriedBlock
     *
     * It updates the lastQueriedBlock for the specified instance
     * @param eventType The event type
     * @param network The current network
     * @param pair The currency/amount pair
     */
    TornadoEventsDB.prototype.updateLastQueriedBlock = function (eventType, network, pair, lastQueriedBlock) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this.getStoreInstanceName(eventType, network, pair);
                return [2 /*return*/, this.putValue("lastEvents", {
                        instance: instance,
                        lastQueriedBlock: lastQueriedBlock,
                    })];
            });
        });
    };
    /**
     * isSpent
     *
     * @param network The current network
     * @param pair The currency/amount pair
     * @param nullifier The nullifier hex to filter to
     *
     * @returns Whether or not the deposit has been spent
     */
    TornadoEventsDB.prototype.isSpent = function (network, pair, nullifier) {
        return __awaiter(this, void 0, void 0, function () {
            var isSpent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWithdrawalEventByNullifier(network, pair, nullifier)];
                    case 1:
                        isSpent = _a.sent();
                        return [2 /*return*/, !!isSpent];
                }
            });
        });
    };
    /**
     * getWithdrawalEventByNullifier
     *
     * @param network The current network
     * @param pair The currency/amount pair
     * @param nullifier The nullifier hex to filter to
     *
     * @returns The nullifier withdrawal event
     */
    TornadoEventsDB.prototype.getWithdrawalEventByNullifier = function (network, pair, nullifier) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this.getWithdrawalTableName(network, pair);
                return [2 /*return*/, this.getValue(instance, nullifier)];
            });
        });
    };
    /**
     * getDepositEventByCommitment
     *
     * @param network The current network
     * @param pair The currency/amount pair
     * @param commitment The commitment to filter to
     *
     * @returns The commitment deposit event
     */
    TornadoEventsDB.prototype.getDepositEventByCommitment = function (network, pair, commitment) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this.getDepositTableName(network, pair);
                return [2 /*return*/, this.getValueFromIndex(instance, "commitment", commitment)];
            });
        });
    };
    /**
     * getAllDepositsByLeafIndex
     *
     * @param network The current network
     * @param pair The currency/amount pair
     * @returns All the deposits events ordered by leafIndex
     */
    TornadoEventsDB.prototype.getAllDepositsByLeafIndex = function (network, pair, lastLeafIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this.getDepositTableName(network, pair);
                return [2 /*return*/, this.getAllFromIndex(instance, "leafIndex", lastLeafIndex ? IDBKeyRange.lowerBound(lastLeafIndex + 1) : undefined)];
            });
        });
    };
    /**
     * getAllEvents
     *
     * @param eventType The event type
     * @param network The current network
     * @param pair The currency/amount pair
     * @returns All the specified instance Tornado events
     */
    // Complex type
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    TornadoEventsDB.prototype.getAllEvents = function (eventType, network, pair) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                instance = this.getStoreInstanceName(eventType, network, pair);
                return [2 /*return*/, this.getAllValues(instance)];
            });
        });
    };
    /**
     * createStoreInstances
     *
     * It creates the required store instances
     */
    TornadoEventsDB.prototype.createStoreInstances = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tables, _loop_1, _i, _a, network;
            return __generator(this, function (_b) {
                tables = [];
                _loop_1 = function (network) {
                    var _loop_2 = function (currency, amount) {
                        amount.forEach(function (v) {
                            var depositName = "deposits-".concat(network, "-").concat(currency, "-").concat(v);
                            var withdrawalName = "withdrawals-".concat(network, "-").concat(currency, "-").concat(v);
                            tables.push({
                                name: depositName,
                                keyPath: "leafIndex",
                                indexes: ["leafIndex", "commitment"],
                            });
                            tables.push({
                                name: withdrawalName,
                                keyPath: "nullifierHex",
                                indexes: ["nullifierHex"],
                            });
                        });
                    };
                    for (var _c = 0, _d = Object.entries(types_1.CurrencyAmountArray); _c < _d.length; _c++) {
                        var _e = _d[_c], currency = _e[0], amount = _e[1];
                        _loop_2(currency, amount);
                    }
                };
                // Create available networks tornado instances tables for deposits and withdrawals events
                for (_i = 0, _a = Object.values(types_1.AvailableNetworks); _i < _a.length; _i++) {
                    network = _a[_i];
                    _loop_1(network);
                }
                // Create LastEvents table
                tables.push({
                    name: "lastEvents",
                    keyPath: "instance",
                    indexes: ["instance"],
                });
                return [2 /*return*/, this.createObjectStore(tables)];
            });
        });
    };
    /**
     * updateEvents
     *
     * It updates the list of events for the specified instance
     *
     * @param network The current network
     * @param pair The currency/amount pair
     * @param param2 The type/events object
     */
    TornadoEventsDB.prototype.updateEvents = function (network, pair, _a) {
        var type = _a.type, events = _a.events;
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_b) {
                instance = this.getStoreInstanceName(type, network, pair);
                return [2 /*return*/, this.putBulkValues(instance, events)];
            });
        });
    };
    /**
     * truncateEvents
     *
     * It deletes all the events for the specified instance
     *
     * @param network The current network
     * @param pair The currency/amount pair
     * @param param2 The type/events object
     */
    TornadoEventsDB.prototype.truncateEvents = function (network, pair, _a) {
        var type = _a.type;
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_b) {
                instance = this.getStoreInstanceName(type, network, pair);
                return [2 /*return*/, this.truncateTable(instance)];
            });
        });
    };
    return TornadoEventsDB;
}(IndexedDB_1.default));
exports.TornadoEventsDB = TornadoEventsDB;
