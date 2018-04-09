const { FuseBox, CSSPlugin, SassPlugin, WebIndexPlugin, Sparky, BabelPlugin, QuantumPlugin } = require("fuse-box");
const BUILD_PATH = 'build/';

Sparky.task("default", ['clean', 'copy-assets', 'dev'], () => { });
Sparky.task("prod", ['clean', 'copy-assets', 'production'], () => {});
Sparky.task('clean', () => Sparky.src(BUILD_PATH).clean(BUILD_PATH));
Sparky.task('copy-assets', () => Sparky.src("assets/**/**.*", { base: './src' }).dest('./build'));
Sparky.task('dev', dev);
Sparky.task('production', prod);

function init(isProd) {
  return FuseBox.init({
    homeDir: "src",
    output: "build/$name.js",
    plugins: [
      BabelPlugin({
        config: {
          sourceMaps: true,
          presets: ["es2015"],
          plugins: [

          ],
        },
      }),
      [SassPlugin(), CSSPlugin()],
      CSSPlugin(),
      WebIndexPlugin({ template: 'src/index.html' })
    ]
  });
}

function dev() {
  const fuse = init(false);
  fuse.dev();
  fuse.bundle("app")
    .watch()
    .instructions("> index.js")
    .hmr();
  Sparky.task("clean", () => {
    return Sparky.src("build").clean("build");
  });
  Sparky.task("watch:images", () => {
    return Sparky.watch("**/*.+(svg|png|jpg|gif)", {base: "./src"})
      .dest("./build");
  });
  fuse.run();
}

function prod() {
  const fuse = init(true);
  fuse.bundle("app")
    .instructions("> index.js")
    .hmr();
  Sparky.task("clean", () => {
    return Sparky.src("build").clean("build");
  });
  Sparky.task("watch:images", () => {
    return Sparky.watch("**/*.+(svg|png|jpg|gif)", {base: "./src"})
      .dest("./build");
  });
  fuse.run();
}