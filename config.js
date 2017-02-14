var path = require('path'),
    config;

config = {
    production: {
        url: process.env.BASE_URL || 'http://blog.ertrzyiks.pl/',

        mail: {},

        database: {
            client: 'postgres',
            connection: process.env.DATABASE_URL,
            pool: { min: 0, max: 5 }
        },

        server: {
            host: '0.0.0.0',
            port: process.env.PORT
        },

        storage: {
            active: 'ghost-cloudinary-store',
            'ghost-cloudinary-store': {
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            }
        },

        paths:{
            contentPath: path.join(__dirname, '/content/')
        }
    },
    development: {
        url: 'http://localhost:2368',

        mail: {},

        fileStorage: true,

        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },

        server: {
            host: '0.0.0.0',
            port: '2368'
        },

        paths: {
            contentPath: path.join(__dirname, '/content/')
        }
    }
};

module.exports = config;
