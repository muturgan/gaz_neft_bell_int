import path = require('path');
import nconf = require('nconf');


class Config {

    private _nconf: typeof nconf;

    constructor() {

        this._nconf = nconf;

        // переменные окружения, которые перекрывают конфиг по умолчанию:
        this._nconf.env();

        if (this._nconf.get('OVERRIDES_CONFIG')) {
            let conf = this._nconf.get('OVERRIDES_CONFIG');

            conf = typeof conf === 'string' ? JSON.parse(conf) : conf;

            if (conf) {
                this._nconf.overrides(conf);
            }
        }

        // кастомный локальный файл конфига, который перекроет конфиг по умолчанию, но не переменные окружения
        if (this._nconf.get('OVERRIDES_CONFIG_FILE')) {
            this._nconf.file('overrides', path.join(process.cwd(), this._nconf.get('OVERRIDES_CONFIG_FILE')));
        }

        if (!this._nconf.get('OVERRIDES_CONFIG') && !this._nconf.get('OVERRIDES_CONFIG_FILE')) {
            // если не перекрыты конфиги, то работаем с конфигом для разработчика  development.json
            this._nconf.file('overrides', path.join(process.cwd(), 'config', 'development.json'));
        }

        // конфиг по умолчанию
        this._nconf.file('defaults', path.join(process.cwd(), 'config', 'config.json'));
    }

    public get(key: string) {
        return this._nconf.get(key);
    }
}

export default new Config();
