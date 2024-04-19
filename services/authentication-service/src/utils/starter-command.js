import User from "../models/User.js";
import * as bcrypt from "bcrypt";
import logger from "../configs/logging.js";

export const runStarterCommand = async (req) => {
    const admin = await User.findOne({role: 'admin'}).exec();

    if (!admin) {
        const hashedPassword = await bcrypt.hash('password', 10);

        await User.create({
            name: 'Admin',
            email: 'admin@local.host',
            password: hashedPassword,
            role: 'admin',
        });

        logger.info('Admin user created');
    }
}