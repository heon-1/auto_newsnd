import { AppDataSource } from '../data-source';
import { UploadToMagazine } from './upload';

test('upload test', async () => {
    try {
        const res = await UploadToMagazine();
        console.log(res);
    } catch (err) {
        console.log(err);
    }
});
