// A functional in-memory cache to replace mock / real redis if cloud fails
class MemoryCache {
    constructor() {
        this.data = new Map();
    }
    async connect() {
        console.log("Memory Cache connected (Redis fallback)");
        return true;
    }
    async get(key) {
        const item = this.data.get(key);
        if (!item) return null;
        if (item.expiry && Date.now() > item.expiry) {
            this.data.delete(key);
            return null;
        }
        return item.value;
    }
    async set(key, value, options = {}) {
        let expiry = null;
        if (options.EX) {
            expiry = Date.now() + (options.EX * 1000);
        }
        this.data.set(key, { value, expiry });
        return 'OK';
    }
    async exists(key) {
        const item = this.data.get(key);
        if (!item) return 0;
        if (item.expiry && Date.now() > item.expiry) {
            this.data.delete(key);
            return 0;
        }
        return 1;
    }
    async expireAt(key, timestamp) {
        const item = this.data.get(key);
        if (item) {
            item.expiry = timestamp * 1000;
        }
        return 1;
    }
    async del(key) {
        return this.data.delete(key);
    }
}
const redisClient = new MemoryCache();
module.exports = redisClient;