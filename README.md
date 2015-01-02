# Admin

This admin dashboard was created as the world was lacking a simple, responsive, and slick looking dashboard. Other available dashboards are bloated with external plugins and require a lot of hackery/work out of the box.

The project is a fork of [RDash](https://github.com/rdash/rdash-angular). The main changes are the removal of AngularJS and simplification of project organization (one repo). It still uses [Bootstrap](http://getbootstrap.com/) & [Font Awesome](http://fortawesome.github.io/Font-Awesome/).

## Usage
### Requirements
* [NodeJS](http://nodejs.org/)
* [Bower](http://bower.io)
* [Gulp](http://gulpjs.com/)

### Installation
1. Clone the repository: `git clone https://github.com/emils/admin.git`
2. Install the NodeJS dependencies: `npm install`.
3. Install the Bower dependencies: `bower install`.
4. Run the gulp default task, `gulp`, or `npm start`. This will run a live reload server on [http://localhost:8080](http://localhost:8080) and build any changes made automatically.

##### Widgets

A widget is essentially a white container box with some styling, that will expand 100% of it's parent container. To separate these out, I suggest putting them inside a bootstrap grid item, e.g:

```HTML
<div class="col-lg-3">
	<div class="widget">
```

A widget has a `widget-title` and also a `widget-body` which can be used individually inside the widget.

Any content can be inside a `widget-body`, which will be padded by default. Three set sizes for the body are available and will provide a scroller for the content when the content breaks the height. Apply either `large` `medium` or `small` to the `widget-body` class, e.g: `<div class="widget-body medium">`.

> If no size is set, the content will expand vertically based on content size.

###### Widget Body

**Padding**

Padding inside widgets is set to 20px. To remove this padding, apply the `no-padding` class on the widget body, e.g: `<div class="widget-body no-padding">`.

**Tables**

Styling for tables is included. Ensure your table has the class `table` and feel free to apply other Bootstrap classes. For table headings use `thead` and the body `tbody`. Tables work well with the `no-padding` class.
