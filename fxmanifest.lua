fx_version 'cerulean'
game 'gta5'

author 'mufty'
description 'MRP UI Radial menu'
version '0.0.1'

ui_page 'ui/index.html'

files {
    'ui/scripts/main.js',
    'ui/styles/style.css',
    'ui/index.html',
    'client.js',
}

client_scripts {
    '@mrp_core/shared/debug.js',
    'client.js',
}
