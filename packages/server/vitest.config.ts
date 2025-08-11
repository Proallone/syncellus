import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        // You can set options here.
        // For example, to enable "globals" (no need to import test/expect)
        // globals: true,

        // By default, Vitest will look for files with .test. or .spec. in the name
        // in your project. You can change this pattern here:
        include: ["test/**/*.{test,spec}.?(c|m)[jt]s?(x)"],

        // For Express apps, you'll likely be testing server code, so you don't need
        // a DOM environment. The default `node` environment is perfect.
        environment: "node",

        // Specify coverage options
        coverage: {
            include: ["src/modules/"],
            provider: "v8", // or 'istanbul'
            reporter: ["text", "json", "html"],
            reportsDirectory: "test/coverage/"
        }
    }
});
