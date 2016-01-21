/**
 * Copyright © 2015 Dazvolt (Mikalai Eutsikhieu)
 *
 * Licensed under the terms of the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Requires jQuery & jQuery UI widget factory
 */

$.widget('custom.volt', {
    options: {
        neon_flicker: {
            enable: true,
            /**
             * Type should be 'block' or 'text', if 'text' parent block background become transparent
             **/
            type: 'block',
            /**
             * Delay before Neon Flicker begin
             **/
            delay: 2000,
            /**
             * Interval is high importance option which allows you to tweak how fast neon will flick and how many times
             * Between min and max there is random value which will be set as an interval for each flick, keep in mind that flick will
             * get smaller each flick
             * Count is used for number of total flicks
             **/
            interval: {
                /**
                 * There is no point to set min lower than 20 (it will eventually be 10)
                 **/
                min: 50,
                /**
                 * There is no point to set max lower than 80 (it will eventually be 50)
                 **/
                max: 800,
                /**
                 * How much 'ms' will be removed from min and max (for max is step * 10) each count
                 * Doesn't really matter if min and max set to very low values (< 1000)
                 **/
                step: 5,
                /**
                 * How much animation steps should be
                 **/
                count: 10
            },
            custom_color: {
                /**
                 * Enable custom color set to overwrite existing on element
                 * if set to false, custom_color.background will be set to element backgorund
                 **/
                enable: true,
                /**
                 * Background could be set in HEX or RGB(RGBA)
                 * Make sure to use FULL HEX (6 digits) or don't set glow.color = true
                 * Don't use string names for color like "red" or "blue"
                 **/
                background: '#ffb85c',
                glow: {
                    /**
                     * Glow could be set in HEX or RGB(RGBA)
                     * Glow can also be set to {Boolean} "true" which will do automatic color (based on custom_color.background)
                     **/
                    color: true,
                    /**
                     * Blur could be set in any size units you want
                     * Blur can also be set to {Boolean} "true" which will do automatic (30% size of object radius)
                     **/
                    blur: '5px'
                }
            },
            /**
             * Opacity of element which should be when light is "turned off"
             **/
            opacity: 0,
            /**
             * Custom event namespace option
             **/
            event_namespace: 'neon_flicker',
            /**
             * Callback for element when fully lighted
             **/
            callback: function () {
            }
        }
    },

    /**
     * Main init of widget
     *
     * @private
     */
    _init: function () {
        if (this.options.neon_flicker.enable) this._handle_neon_flicker();
    },

    /**
     * Observes settings for NeonFlicker and process CSS
     *
     * @private
     */
    _handle_neon_flicker: function () {
        var min = this.options.neon_flicker.interval.min,
            max = this.options.neon_flicker.interval.max,
            count = this.options.neon_flicker.interval.count;

        this._neon_flicker_css();
        this._neon_flicker(min, max, count, this.options.neon_flicker.custom_color);
    },

    /**
     * Creates styles for NeonFlicker object
     *
     * @private
     */
    _neon_flicker_css: function () {
        var background,
            color = this._hex_to_rgb(this.options.neon_flicker.custom_color.glow.color),
            blur = this.options.neon_flicker.custom_color.glow.blur,
            opacity = this.options.neon_flicker.opacity;

        if (this.options.neon_flicker.custom_color.enable) {
            background = this.options.neon_flicker.custom_color.background;
        } else {
            background = $(this.element).css('background');
        }

        $(this.element).css({
            'box-shadow': '0 0px ' + blur + 'px rgb(' + color + ')',
            'opacity': opacity
        });

        if (this.options.neon_flicker.type === 'block') {
            $(this.element).css('background', background);
        } else if (this.options.neon_flicker.type === 'text') {
            $(this.element).css('color', background);
        }

    },

    /**
     * Main handler for NeonFlicker
     *
     * @param {Number} min
     * @param {Number} max
     * @param {Number} count
     * @param {Object} css
     * @private
     */
    _neon_flicker: function (min, max, count, css) {
        var $this = $(this.element),
            self = this,
            interval = 0;

        /**
         * Lights up Neon object
         * Both up() and donw() creates animation for NeonFlicker
         *
         * @private
         */
        function flicker_up() {
            max = max - (count * 10 * self.options.neon_flicker.interval.step);
            min = min - (count * self.options.neon_flicker.interval.step);

            if (min <= 10) min = 10;
            if (max <= 50) max = 50;

            interval = Math.floor(Math.random() * (max - min + 1)) + min;

            if (typeof css.glow.blur !== 'string') {
                css.glow.blur = (($this.width() + $this.height()) / 2) * 0.3 + 'px';
            }

            if (typeof css.glow.color !== 'string') {
                if (css.background.indexOf('#') > -1) {
                    css.glow.color = 'rgb(' + self._hex_to_rgb(css.background) + ')';
                } else {
                    css.glow.color = css.background;
                }
            }

            $this.css({
                'opacity': 1
            });

            if (self.options.neon_flicker.type === 'block') {
                $this.css({
                    'box-shadow': '0 0 ' + css.glow.blur + ' ' + css.glow.color
                });
            } else if (self.options.neon_flicker.type === 'text') {
                $this.css({
                    'text-shadow': '0 0 ' + css.glow.blur + ' ' + css.glow.color
                });
            }

            setTimeout(function () {
                count--;
                if (count > 0) {
                    flicker_down();
                } else {
                    if (typeof self.options.neon_flicker.callback === 'function') {
                        self.options.neon_flicker.callback();
                    }
                }
            }, interval);
        }

        /**
         * Turns off Neon object
         *
         * @private
         */
        function flicker_down() {
            interval = Math.floor(Math.random() * (max - min + 1)) + min;

            $this.css({
                'opacity': self.options.neon_flicker.opacity
            });

            setTimeout(function () {
                flicker_up();
            }, interval);
        }

        if (this.options.neon_flicker.delay > 0) {
            setTimeout(function () {
                flicker_up();
            }, this.options.neon_flicker.delay);
        } else {
            flicker_up();
        }
    },

    /**
     * Transforms hex string to rgb string
     *
     * @param {String} hex
     * @private
     */
    _hex_to_rgb: function (hex) {
        return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
    },

    /**
     * Toggles light on Neon object
     *
     * @public
     */
    neon_toggle: function () {
        //erase callback because of options compatibility problems
        //in case you want to use callback - catch events for toggle_on and _off
        this.options.neon_flicker.callback = function () {};

        if ( parseInt(this.element.css('opacity')) === 1 ) {
            this.element.trigger('toggled_off.' + this.options.neon_flicker.event_namespace);
            this.element.css({
                'opacity': this.options.neon_flicker.opacity
            });
        } else {
            this.element.trigger('toggled_on.' + this.options.neon_flicker.event_namespace);
            this._handle_neon_flicker();
        }
    },

    /**
     * Destroys volt.js instance and assigned objects
     *
     * @public
     */
    destroy : function () {
        this.element.remove();
        $.Widget.prototype.destroy.call(this);
    }
});