# NgxScrollSpy

[![NPM](https://img.shields.io/npm/v/@thejlifex/ngx-scroll-spy?label=NPM&color=blue)](https://www.npmjs.com/package/@thejlifex/ngx-scroll-spy "View this project on NPM.") [![NPM downloads](https://img.shields.io/npm/dt/@thejlifex/ngx-scroll-spy?label=NPM%20downloads)](https://www.npmjs.com/package/@thejlifex/ngx-scroll-spy "View this project on NPM.")

## Angular scroll spy library
An Angular library that can automatically spy the position of elements (inside a scrollable container) and emit the currently active (visible) element in the viewport (add and remove the spyActiveClass, default: `active`).

### Features:
- Works for nested and dynamically added and removed (*ngIf) elements.
- Supports multiple scroll-spies.
- Supports window resizing.

<!-- ## Demo image @todo -->

## [View the demo](https://stackblitz.com/edit/ngx-scroll-spy)

## Installation
```sh
npm install @thejlifex/ngx-scroll-spy --save
```

### Step 01: Import the `SpyDirective` and `SpyTargetDirective` to your module (or to your standalone component).
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { SpyDirective, SpyTargetDirective } from '@thejlifex/ngx-scroll-spy';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    SpyDirective,
    SpyTargetDirective

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 02: Add the `spy` directive.
**app.component.html**
```html
<nav>
  <a spy [spyTargetId]="'home'">Home</a>
  <a spy [spyTargetId]="'features'">Features</a>
  <a spy [spyTargetId]="'pricing'">Pricing</a>
</nav>
```

### Step 03: Add the `spyTarget` directive.
**app.component.html**
```html
<section spyTarget [spyTargetId]="'home'">Home</section>
<section spyTarget [spyTargetId]="'features'">Features</section>
<section spyTarget [spyTargetId]="'pricing'">Pricing</section>
```

### Step 04: Hightlight the active nav link.
**app.component.scss**
```scss
nav a.active {
  color: blue;
}
```

## Documentation
### SpyDirective (`spy`)
Spies on the spyTarget that has the provided spyTargetId.
| @Input() | Type | Required | Default | Description |
|---|---|---|---|---|
| spyTargetId | string | yes | none | ID of the spyTarget to spy. |
| spyTargetContainerId | string | optional | none | ID of the spyTargetContainer containing the spyTarget. |
| spyActiveClass | string | optional | `'active'` | Class name to add to this element when the spyTarget has transitioned into a state of intersection (is visisble). |
### SpyTargetDirective (`spyTarget`)
Adds this element as spy-target and starts to observe this target.
Automatically removes this element as spy-target and stops observing this target when the element is destroyed.
| @Input() | Type | Required | Default | Description |
|---|---|---|---|---|
| spyTargetId | string | yes | none | ID for this spyTarget. |
| spyTargetContainerId | string | optional | none | ID for the spyTargetContainer containing this spyTarget. |
### SpyTargetContainerDirective (`spyTargetContainer`)
Creates a scroll-spy on this spy targets container (element).
Automatically destroys the scroll-spy when the element is destroyed.

This is useful:

- when you have multiple (independent) scrollable elements on the same page,
- or the scrollable element on your page is not the browser default scrollable element, for example `<mat-sidenav-content>` if you are using [Angular Material Sidenav]( https://material.angular.io/components/sidenav)

where you want to have a scroll-spy.

| @Input() | Type | Required | Default | Description |
|---|---|---|---|---|
| spyTargetContainerId | string | yes | none | ID for this spyTargetContainer. |

## Usage with additionally a spyTargetContainer.

### Step 01: Import additionally the `SpyTargetContainerDirective` to your module (or to your standalone component).
```ts
import { ..., SpyTargetContainerDirective } from '@thejlifex/ngx-scroll-spy';

...

imports: [
  ...
  SpyTargetContainerDirective
]
```

### Step 02: Add the `spyTargetContainer` directive.

**app.component.html**
```html
<nav>
  <a spy [spyTargetId]="'home'" [spyTargetContainerId]="myContainerId">Home</a>
  ...
</nav>

<div spyTargetContainer [spyTargetContainerId]="myContainerId">
  <section spyTarget [spyTargetId]="'home'"  [spyTargetContainerId]="myContainerId">Home</section>
  ...
</div>
```

## License
MIT
