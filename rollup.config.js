import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const external = Object.keys(pkg.peerDependencies || []);

export default {
    input: 'src/index.js',
    plugins: [
        babel()
    ],
    external: external,
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
        },
        {
            file: pkg.browser,
            format: 'umd',
            exports: 'named',
            sourcemap: true,
            name: 'bemFactory'
        },
    ]
}
