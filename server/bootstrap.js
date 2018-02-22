require('ignore-styles');

require('babel-register')({
    ignore: [ /(node_modules)/ ],
    presets: ['env', 'react'],
    plugins: [
        'syntax-dynamic-import',
        'dynamic-import-node',
        'react-loadable/babel'
    ]
});

require('./index');