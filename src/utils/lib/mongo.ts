import mongoose from 'mongoose';
import _mongoose, { connect } from 'mongoose';

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to .env.local');
}

//cashed connection instance
let cashedConnection: undefined | typeof _mongoose;

export async function connectDb() {
    if (cashedConnection) {
        console.log('🚀 ~ Using cashed Connection');
        return cashedConnection;
    }
    try {
        cashedConnection = await connect(process.env.MONGODB_URI as string);
        console.log(
            '🚀 Connection established database :',
            cashedConnection.connection.db.databaseName
        );
    } catch (error : any) {
        console.log("🚀 ~ connectDb ~ error:", error.message)
        console.log('❌ Connection to database failed');
    }
    return cashedConnection;
}

export default connectDb;
