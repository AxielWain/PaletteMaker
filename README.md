## Palette Maker

A Web Application with no persistent storage options unless you copy the generated colors or JSON color definition. It is based around the basic colors of a terminal application. It computes the remaining colors from the base eight terminal colors.

### Motivation

Choosing colors for theming the [terminal](https://alacritty.org/), [i3wm](https://i3wm.org/) and [Polybar](https://polybar.github.io/) has been really challenging, so this web application was born with the purpose of helping choosing colors with a good contrast ratio.

### Functionality

It allows to modify eight basic colors, one for background, one for foreground (they interchange between them for the inverse color theme), three for RGB primary colors and three for CMY secondary colors. It computes interpolated tertiary colors based on the RGB and CMY colors, alongside lighter and darker shades of all colors.

Click on `Compute` to generate the entire palette. Any single color can be copied by clicking it and later clicking on `Copy`. There's a text are that holds de Color Definition that can be used to save the generated palette in a plain text file. Clicking on `Load` while having such a Color Definition, will load the colors in the Web App.

Change the Shade Row to check the contrast ratio of the row of colors currently selected. The Home Row is the middle one, and the only row that can be seen during the initial load of the application or when the palette has been reset.

### Scripts

This applications was developed using Node 18 LTS, Vite, and React 18. Uses a SVG favicon.

The following scripts are available:

- `npm run dev` to have a dev preview of the application running on localhost:5000 by default
- `npm run build` builds the application. It is meant to be deployed into Github Pages, but it should work with any other static page hosting
