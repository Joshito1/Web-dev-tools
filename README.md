# VCPTool

## Why create VCPTool?
When trying to choose a color, sometimes you may want to look back into your color palette file. Because one may forget which colors one has picked after a while of designing specific components in your webpage. But going back and forth may be time consuming. So by creating vcp tool, you may now have it beside you when designing and you can choose on the fly which color should be used on elements. So I present to you the plugin 'VCPTool'. It is a simple Tool to assist you in designing.


## User Manual:
### Toggle:
- Win/Linux: Alt + p
- Mac: Command + p

### Configuring Styles so the tool uses the color palette:

> [!IMPORTANT]
> You must follow the convention naming and syntax for the tool to use your palette.

> [!NOTE]
> You must create a :root pseudo-class selector and then enter the giving names below.

#### Using CSS:
```css
:root {
    --color-primary: ;
    --color-secondary: ;
    --color-tertiary: ;
    --color-quaternary: ;
    etc.
}
```

#### Using SASS:
Quite similar as CSS just in SASS syntax
```scss
$color-primary: #000000ff;
$color-secondary: #535353ff;
$color-tertiary: #808080ff;
$color-quaternary: #ffffffff;

:root {
    --color-primary: #{$color-primary};
    --color-secondary: #{$color-secondary};
    --color-tertiary: #{$color-tertiary};
    --color-quaternary: #{$color-quaternary};
}
```
<br><br><br>
# Project Notes
## Implement Goal:
Type your prefered color pallete in styles and it exports to this JS file and displays color pallete on screen.

## Guide:
If using sass/scss, write down pallete in base, and write in specified format for identification;
```scss
$color-main: ;
$color-secondary: ;
$color-teritary: ;
$color-quaternary: ;
$color-quinary: ;
etc.
```
Create Divs with classes, 20x20px size and display on the center right.

## Plans and Features:
- (Half - Only with keyboard) Togglable
    - Add a button
- (Complete) Draggable (to compare)
- (Complete) Orientational
- (Complete) Position Presets or Manual Positioning (could be tied to Draggable)
- Display size when resizing then fade out etc.
- Add more custom semantic color order, making sure if they exist, if  not, then ignore.
- Add config.json for adding more color support.
- Fetch Color Palettes from webpages (More advanced, and out of path Idea. Came from creating a bookmarklet. This will display a visual of all colors being used on the webpage.)

# Acknowledgements:
Remix Icon for its Icons.


DM: 11/1/25