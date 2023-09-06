import { AppDataSource } from './data-source';
import cron from 'node-cron';
import { ScrapAll } from './services/scrap';
import { UploadToMagazine } from './services/upload';

AppDataSource.initialize();

cron.schedule('*/10 * * * *', async function () {
    try {
        await ScrapAll();
    } catch (err) {
        console.log(err);
    }
});

cron.schedule('*/15 * * * *', async function () {
    try {
        await UploadToMagazine();
    } catch (err) {
        console.log(err);
    }
});
