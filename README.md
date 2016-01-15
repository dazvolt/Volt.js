# Volt.js
Volt.js is a jQuery &amp; jQuery UI based collection of scripts delivered as jQuery UI widget, which allows to create different light effects.

Currently is in active development.

# Feature: Neon Flicker
Neon flicker allows to imitate well-known neon light effect when it's turned on.

## List of options

### neon_flicker.enable {Boolean}
###### Default: true

Enables Neon Flicker script

### neon_flicker.type {String}
###### Default: 'block'

Could be either 'text' or 'block', you can set any block to glow or do it only for text in block (keep in mind that if you set 'text', parent tag background will be set transparent)

### neon_flicker.delay {Number} (ms)
###### Default: 0

How much time do you want to wait until Neon Flicker will light up. If set to 0 - no timeout applied.

### neon_flicker.interval
Interval is high importance option which allows you to tweak how fast neon will flick and how many times.
Contains some options:
##### neon_flicker.interval.min {Number} (ms)
###### Default: 50

This param determines how much minimum time it will take to fire up light sequence (random between min and max). Keep in mind that every step time will be lowered, to create faster light effect.

##### neon_flicker.interval.max {Number} (ms)
###### Default: 800

This param determines how much maximum time it will take to fire up light sequence (random between min and max). Keep in mind that every step time will be lowered, to create faster light effect.

##### neon_flicker.interval.step_size {Number} (ms)
###### Default: 5

This param determines how much 'ms' will be removed from min and max (for max is step * 10) each step. Doesn't really matter if min and max set to very low values (< 1000)

##### neon_flicker.interval.steps {Number}
###### Default: 10

How much animation steps should be in light animation. One step means light will be turned on and off once.

### neon_flicker.custom_color
This part contains number of options to control color of Neon Flicker.
Contains following options:
##### neon_flicker.custom_color.enable {Boolean}
###### Default: true

Enable custom color set to overwrite existing on element, if set to false, neon_flicker.custom_color.background will be set to element background.

##### neon_flicker.custom_color.background {String}
###### Default: '#ffffff'

Background for element which will light up.
Background could be set in HEX or RGB(RGBA).
Make sure to use FULL HEX (6 digits) or don't set glow.color = true.
Don't use string names for color like "red" or "blue".

##### neon_flicker.custom_color.glow.color {String}
###### Default: true

Determines what color to glow around element.
Glow could be set in HEX or RGB(RGBA)
Glow can also be set to {Boolean} "true" which will do automatic color (based on custom_color.background)

##### neon_flicker.custom_color.glow.blur {String}
###### Default: true

You can set your own size of Blur field around element.
Blur could be set in any size units you want.
Blur can also be set to {Boolean} "true" which will do automatic (30% size of object radius).

### neon_flicker.opacity {Number}
###### Default: 0

Opacity of element which should be when light is "turned off"

### neon_flicker.callback {Function}
###### Default: function () {}

Callback for element when animation sequence is finished
