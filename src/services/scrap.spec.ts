import { AppDataSource } from '../data-source';
import { ScrapAll } from './scrap';

test('scrap test', async () => {
    AppDataSource.initialize()
        .then(() => {
            ScrapAll()
                .then(() => {})
                .catch((err) => console.log(err));
        })
        .catch((err) => console.error(err));
});
