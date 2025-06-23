import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || '');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}


// Eventos de conexión
mongoose.connection.on('connected', () => {
    console.log(colors.green('🟢 Mongoose conectado a MongoDB'));
});

mongoose.connection.on('error', (err) => {
    console.error(colors.red('🔴 Error de conexión Mongoose:'), err);
});

mongoose.connection.on('disconnected', () => {
    console.log(colors.yellow('🟡 Mongoose desconectado de MongoDB'));
});

export default connectDB;