import { AppDataSource } from './data-source';
import { ScrapAll } from './services/scrap';
import { UploadToMagazine } from './services/upload';

AppDataSource.initialize().then(async () => {
    await ScrapAll();
    await UploadToMagazine();
});
