# RubberBand

## A Responsive Web Design Tool

So, what is __RubberBand__? It's a light-weight, versatile and simple to use tool to help you develop responsive websites. Below are a few features and a how to guide where you can find out how to get started, how to use the tool and some of the options you can define to customize your setup. First of all though, some bit that __RubberBand__ does.

### Responsive Columns &amp; Baselines

Depending on your browser or device, you'll be shown a group of columns consisting of four (mobile), eight (tablet) or sixteen (desktop, large screen). As the browser resizes so too will the columns, baselines and the amount of them. __RubberBand__ allows you to easily lay out your content across any device.

### CSS Calculator

__RubberBand__ relies heavily on percentages and calculating ems instead of relying on the good 'ol pixels. Because of that you will most likely be doing lots of calculations, new font-sizes, line-heights, margins and padding. __RubberBand__ is there to simplify some the process and offers a calculator. All you do now is type your desired font-size and have the CSS generated for you, speedy!

### Viewport Switching

There will come a time when you want to see how your page will look in smaller windows, resizing a browser manually is annoying and you may just want to see your design quickly at a certain width without having to upload and view through an actual mobile device. __RubberBand__ can help with that, meaning making changes is that little bit faster.

## How To

### Getting Started

I am going to assume you've already downloaded either the normal or minified _(recommended)_ version of __RubberBand__, put it in your website's Javascript directory and referenced it in the footer of your __HTML__, if not, you should definitely do that now.

#### html5

`<script src="/my-javascript-dir/rubberband.min.js"></script>`

#### html4/xhtml

`<script src="/my-javascript-dir/rubberband.min.js" type="text/javascript"></script>`

You should hopefully see a small box in the top right corner of your webpage with a little down arrow icon. Hovering this will show __RubberBand__. If you can't see __RubberBand__, double check the path to the Javascript is correct.

#### Setting Some Defaults

Now you have __RubberBand__ showing, it's best to set some defaults.

##### HTML

You want to let your webpage know it should try and look good on a mobile device, you can do this using the following piece of __HTML__.

`<meta name="viewport" content="width=device-width, initial-scale=1, target-densitydpi=device-dpi" />`

It's a simple as that, with this line of code you tell the site to be as wide as whatever device it is being viewed on, you don't want the content to be zoomed. For more information I suggest reading the following article on the subject [An introduction to meta viewport and @viewport](http://dev.opera.com/articles/view/an-introduction-to-meta-viewport-and-viewport/ "read more about the viewport meta")

##### CSS

For __CSS__ I highly recommend using a Reset stylesheet. Once you have added your reset stylesheet, in your own stylesheet, make sure to set a default font-size and line-height. The way I decide these values is to choose a size for an average paragraph. If I don't want the average paragraph text to ever be bigger than 14 pixels and the line-height to be 1.5 &times; the size of the text, I will set my body text to include the following:

`body { font-size: 14px; line-height: 1.5em; }`

It is important to set these two initial values as all calculations will be driven from the values set in the body. If you are happy with the defaults, be sure to set a line-height regardless to make sure all browsers are using the same line-height.

### Setting Custom Options

__RubberBand__ comes with some options that you can set which can help during your development.

<table>
  <tr>
    <th>Attribute</th>
    <th>Value</th>
    <th>Default</th>
    <th>Description</th>
  </tr>

  <tr>
    <td>showAlways</td>
    <td>boolean</td>
    <td>false</td>
    <td>If set to TRUE, the tools will be shown always.</td>
  </tr>

  <tr>
    <td>hideColumns</td>
    <td>boolean</td>
    <td>false</td>
    <td>If set to TRUE, columns will be hidden when the guide is on.</td>
  </tr>

  <tr>
    <td>hideBaseline</td>
    <td>boolean</td>
    <td>false</td>
    <td>If set to TRUE, baselines will be hidden when the guide is on.</td>
  </tr>

  <tr>
    <td>mobileLandscape</td>
    <td>number</td>
    <td>640</td>
    <td>Change this value to show a different width for the mobile landscape view.</td>
  </tr>

  <tr>
    <td>mobilePortrait</td>
    <td>number</td>
    <td>480</td>
    <td>Change this value to show a different width for the mobile portrait view.</td>
  </tr>

  <tr>
    <td>tabletLandscape</td>
    <td>number</td>
    <td>1024</td>
    <td>Change this value to show a different width for the tablet landscape view.</td>
  </tr>

  <tr>
    <td>tabletPortrait</td>
    <td>number</td>
    <td>768</td>
    <td>Change this value to show a different width for the tablet portrait view.</td>
  </tr>
</table>

You can set these options by having a script tag in your footer, below the link to __RubberBand__. Here is an example of a setup which has the tools always showing, the baselines hidden and a mobile portrait view of 240 pixels.

    <script src="/my-javascript-dir/rubberband.min.js"></script>
    <script>
        rubberband.options({
            showAlways: true,
            hideBaseline: true,
            mobilePortrait: 240
        });
    </script>

### Using The Calculator

## Feeding Back