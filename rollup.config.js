import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

const conf = [
    {
        input: "src/contentScripts/index.js",
        output: {
            file: "build/contentScripts/index.js",
            format: "cjs",
        },
        plugins: [
            uglify()
        ]
    },
    {
        input: "src/contentScripts/intercept.js",
        output: {
            file: "build/contentScripts/intercept.js",
            format: "cjs",
        },
        plugins: [
            nodeResolve(),
            commonjs({
                include: 'node_modules/**',
            }),
            uglify()
        ]
    },
]

export default conf;
