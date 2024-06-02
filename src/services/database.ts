import { Db, MongoClient } from "mongodb"

class Database {
    private static instance: Database;
    private static client: MongoClient;
    private static connection: Db;
    private static uri: string = "mongodb://localhost:27017/";
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
}

export default Database;