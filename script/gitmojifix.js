// 解决 commitlit gitmoji.json 文件丢失问题

const fs = require('fs');
const path = require('path')

fs.writeFileSync(
    path.join(__dirname, '../node_modules/commitlint-plugin-gitmoji/lib/gitmojis.json'),
    fs.readFileSync(
        path.join(__dirname, '../gitmojis.json')
    )
);
