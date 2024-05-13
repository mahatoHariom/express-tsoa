
import app from './app';
import { config } from './config/env';

app.listen(config.port, () => console.log(`🚀🦅 App listening on the http://localhost:${config.port}`));
