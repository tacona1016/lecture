# Official Fontsource package provenance

Package: `@fontsource-variable/noto-sans-kr` 5.3.1.
Source: https://github.com/fontsource/font-files/tree/5a72889057f592bb0659629e38337359f94d53b2/fonts/variable/noto-sans-kr
License: OFL-1.1, reproduced unchanged in LICENSE.

The complete 135-file package (including 124 WOFF2 Unicode subsets) is copied
unchanged from the official Fontsource repository. Each downloaded file was
verified against its upstream Git blob SHA before writing. No font was edited.
The package is vendored because the execution environment blocks npm registry
downloads. npm's local file dependency and lockfile make installs reproducible
without a font CDN or an unavailable developer cache.

index.css declares weights 100–900, font-display: swap and Unicode ranges.
Vite bundles these assets under the configured GitHub Pages base. Browsers
request only subsets needed by the current slide. This provenance document is
the only additional file inside the copied package.
