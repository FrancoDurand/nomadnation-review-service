import { Db, MongoClient } from "mongodb"

class Database {
    private static instance: Database;
    private static client: MongoClient | null = null;
    private static connection: Db | null = null;
    private static uri: string = process.env.DB_URI || "mongodb://localhost:27017/";
    private static database: string = "nomadnation";

    static getInstance(): Database {
        if (!Database.instance)
            Database.instance = new Database();

        return Database.instance;
    }

    static async connect(): Promise<Db> {
        if (!Database.connection) {
            try {
                Database.client = await new MongoClient(this.uri);
                Database.connection = await Database.client.db(Database.database);
            }
            catch (e) {
                throw e;
            }
        }

        return Database.connection;
    }

    static async disconnect(): Promise<void> {
        try {
            if (Database.client) {
                await Database.client.close();
                Database.client = null;
                Database.connection = null;
                console.log("Disconnected from MongoDB");
            }
        } catch (e) {
            console.error("Error disconnecting from MongoDB:", e);
            throw e;
        }
    }

}

export default Database;