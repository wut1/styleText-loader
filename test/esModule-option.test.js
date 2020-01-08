import path from 'path';

import {
  compile,
  getCompiler,
  getEntryByInjectType,
  getErrors,
  getWarnings,
  runInJsDom,
} from './helpers/index';

describe('参数"esModule"', () => {
    const entry = './simple.js';
    it(`没有指定的时候应该可用`, async () => {
      const compiler = getCompiler(entry);
      const stats = await compile(compiler);

      runInJsDom('main.bundle.js', compiler, stats, (dom) => {
        expect(dom.serialize()).toMatchSnapshot('DOM');
      });

      expect(getWarnings(stats)).toMatchSnapshot('warnings');
      expect(getErrors(stats)).toMatchSnapshot('errors');
    });

    it(`指定为"true"的时候应该可用`, async () => {
     
      const compiler = getCompiler(entry, {esModule: true });
      const stats = await compile(compiler);

      runInJsDom('main.bundle.js', compiler, stats, (dom) => {
        expect(dom.serialize()).toMatchSnapshot('DOM');
      });

      expect(getWarnings(stats)).toMatchSnapshot('warnings');
      expect(getErrors(stats)).toMatchSnapshot('errors');
    });

    it(`指定为"true" 并且设置CSS modules时候应该可用`, async () => {
  
      const compiler = getCompiler(
        entry,
        { },
        {
          module: {
            rules: [
              {
                test: /\.css$/i,
                use: [
                  {
                    loader: path.resolve(__dirname, '../src/cjs.js'),
                    options: {esModule: true },
                  },
                   { loader: 'css-loader', options: { modules: true } },
                ],
              },
            ],
          },
        }
      );
      const stats = await compile(compiler);

      runInJsDom('main.bundle.js', compiler, stats, (dom) => {
        expect(dom.serialize()).toMatchSnapshot('DOM');
      });

      expect(getWarnings(stats)).toMatchSnapshot('warnings');
      expect(getErrors(stats)).toMatchSnapshot('errors');
    });

    it(`指定为"true" 并且未设置CSS modules的时候应该可用`, async () => {
      const compiler = getCompiler(
        entry,
        { },
        {
          module: {
            rules: [
              {
                test: /\.css$/i,
                use: [
                  {
                    loader: path.resolve(__dirname, '../src/cjs.js'),
                    options: { esModule: true },
                  },
                   {
                        loader: 'css-loader',
                        options: { modules: false },
                      },
                ],
              },
            ],
          },
        }
      );
      const stats = await compile(compiler);

      runInJsDom('main.bundle.js', compiler, stats, (dom) => {
        expect(dom.serialize()).toMatchSnapshot('DOM');
      });

      expect(getWarnings(stats)).toMatchSnapshot('warnings');
      expect(getErrors(stats)).toMatchSnapshot('errors');
    });

    it(`设置为"false"时应该可用`, async () => {
    
      const compiler = getCompiler(entry, {esModule: false });
      const stats = await compile(compiler);

      runInJsDom('main.bundle.js', compiler, stats, (dom) => {
        expect(dom.serialize()).toMatchSnapshot('DOM');
      });

      expect(getWarnings(stats)).toMatchSnapshot('warnings');
      expect(getErrors(stats)).toMatchSnapshot('errors');
    });

    it(`设置为"false"时并且设置CSS modules应该可用`, async () => {
    
      const compiler = getCompiler(
        entry,
        { },
        {
          module: {
            rules: [
              {
                test: /\.css$/i,
                use: [
                  {
                    loader: path.resolve(__dirname, '../src/cjs.js'),
                    options: {esModule: false },
                  },
                   { loader: 'css-loader', options: { modules: true } },
                ],
              },
            ],
          },
        }
      );
      const stats = await compile(compiler);

      runInJsDom('main.bundle.js', compiler, stats, (dom) => {
        expect(dom.serialize()).toMatchSnapshot('DOM');
      });

      expect(getWarnings(stats)).toMatchSnapshot('warnings');
      expect(getErrors(stats)).toMatchSnapshot('errors');
    });

    it(`设置为"false"时并且未设置CSS modules应该可用`, async () => {
   
      const compiler = getCompiler(
        entry,
        { },
        {
          module: {
            rules: [
              {
                test: /\.css$/i,
                use: [
                  {
                    loader: path.resolve(__dirname, '../src/cjs.js'),
                    options: {esModule: false },
                  },
                  {
                        loader: 'css-loader',
                        options: { modules: false },
                      },
                ],
              },
            ],
          },
        }
      );
      const stats = await compile(compiler);

      runInJsDom('main.bundle.js', compiler, stats, (dom) => {
        expect(dom.serialize()).toMatchSnapshot('DOM');
      });

      expect(getWarnings(stats)).toMatchSnapshot('warnings');
      expect(getErrors(stats)).toMatchSnapshot('errors');
    });
  
});
