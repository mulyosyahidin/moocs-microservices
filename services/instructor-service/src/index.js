import app from "./configs/web.js";
import logger from "./configs/logging.js";
import sequelize from "./configs/database.js";
import MongoDB from "./configs/database.js";

app.listen(process.env.APP_PORT, async () => {
    logger.info(`Server is running on port ${process.env.APP_PORT}`);

    await MongoDB();
});