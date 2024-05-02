"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubManager = void 0;
// Import the necessary module from the 'redis' package
const redis_1 = require("redis");
class PubSubManager {
    // Private constructor to prevent direct construction calls with the `new` operator
    constructor() {
        // Create a Redis client and connect to the Redis server
        this.redisClient = (0, redis_1.createClient)();
        this.redisClient.connect();
        this.subscriptions = new Map();
    }
    // The static method that controls the access to the singleton instance
    static getInstance() {
        if (!PubSubManager.instance) {
            PubSubManager.instance = new PubSubManager();
        }
        return PubSubManager.instance;
    }
    userSubscribe(userId, stock) {
        var _a, _b;
        if (!this.subscriptions.has(stock)) {
            this.subscriptions.set(stock, []);
        }
        (_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.push(userId);
        if (((_b = this.subscriptions.get(stock)) === null || _b === void 0 ? void 0 : _b.length) === 1) {
            this.redisClient.subscribe(stock, (message) => {
                this.handleMessage(stock, message);
            });
            console.log(`Subscribed to Redis channel: ${stock}`);
        }
    }
    userUnSubscribe(userId, stock) {
        var _a, _b;
        this.subscriptions.set(stock, ((_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.filter((sub) => sub !== userId)) || []);
        if (((_b = this.subscriptions.get(stock)) === null || _b === void 0 ? void 0 : _b.length) === 0) {
            this.redisClient.unsubscribe(stock);
            console.log(`UnSubscribed to Redis channel: ${stock}`);
        }
    }
    // Define the method that will be called when a message is published to the subscribed channel
    handleMessage(stock, message) {
        var _a;
        console.log(`Message received on channel ${stock}: ${message}`);
        (_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.forEach((sub) => {
            console.log(`Sending message to user: ${sub}`);
        });
    }
    // Cleanup on instance destruction
    async disconnect() {
        await this.redisClient.quit();
    }
}
exports.PubSubManager = PubSubManager;
