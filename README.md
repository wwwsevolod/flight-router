# Simple Router mixin-component for twitter flight

You need to mixit it up with one of your components and you will be able to use API to listen routes and and move location to needed path.

## Usage example:
####Component with router
```js
define(['path/to/flight-component','path/to/flight-router'], function(defineComponent, router) {
    return defineComponent(newComponent, router);

    function newComponent() {
        this.index = function() {
            alert('INDEX');
        };
        this.basicHelp = function() {
            alert('HELP');
        };
        this.helpWithParams = function(arg) {
            alert(JSON.stringify(arg));
        };
        this.after('initialize', function() {
            this.defineRoute({
                '/' : 'index', //Simple root listener
                '/help' : 'basicHelp', // Simple URL listener
                '/help/:article/:page' : 'helpWithParams', // Parametrized URL listener
                '/:pageType/:article/:page' : 'helpWithParams', // Will match any url like "/asd/wtf/123"
                '/help?:param=:value&:param2=:value2' : 'helpWithParams' // Will match get params
            });
            var counter = 0;
            var index = [
                '/help',
                '/help/how-to-create-route/page2',
                '/FAQ/navigate/1',
                '/help?get=something&andMore=something:dotted'
            ]
            this.on('click', function() {
                this.navigate(index[counter]);
                counter++;
            });
        });
    }
});
```
####Initializing
```js
require(['path/to/flight-component-with-router'], function(component) {
    document.body.innerHTML = 'Click on body to change url and trigger handler \n \
    Try to press BACK and FORWARD button and your listeners will fire';
    component.attachTo(document.body);
});
```

## Documentation
### this.defineRoute(route, callback);
Route is URL like string, where :variable_like_this will be variable.
Callback must be a string or function. If string provided callback would be taken from 'this' by this string.
Every callback will be fired with 'this' component context.

### this.defineRoute(routesHash);
RoutesHash is hash with route / callback key-value pairs.
Like: this.defineRoute({'/', 'callback'});

### this.navigate(URL, [args]);
URL is url like string. Must start from '/'.
Args is optional object with following params:

```js
    replaceState: Boolean
```
If passed state would not be pushed, but replaced, to save history clean.

```js
    data: Object
```
Data that would be passed to handlers AND state.

```js
    forced: Boolean
```
Param that tells fire new state any way even if URL is same.

####Use it