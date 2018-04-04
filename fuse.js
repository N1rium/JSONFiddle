const { FuseBox, CSSPlugin, SassPlugin, WebIndexPlugin, Sparky, BabelPlugin } = require("fuse-box");
const BUILD_PATH = 'build/';

Sparky.task("default", ['clean', 'copy-assets', 'dev'], () => { });
Sparky.task('clean', () => Sparky.src(BUILD_PATH).clean(BUILD_PATH));
Sparky.task('copy-assets', () => Sparky.src("assets/**/**.*", { base: './src' }).dest('./build'));
Sparky.task('dev', dev);

function dev() {
  const fuse = FuseBox.init({
    homeDir: "src",
    output: "dist/$name.js",
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
  
  fuse.dev();
  
  fuse.bundle("app")
    .watch()
    .instructions("> index.js")
    .hmr();
  
  Sparky.task("clean", () => {
    return Sparky.src("dist").clean("dist");
  });
  
  Sparky.task("watch:images", () => {
    return Sparky.watch("**/*.+(svg|png|jpg|gif)", {base: "./src"})
      .dest("./dist");
  });
  
  fuse.run();
}