
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var domify = require('domify');
var el = require('el-component');

/**
 * Expose `overlay()`.
 */

exports = module.exports = overlay;

/**
 * Expose `Overlay`.
 */

exports.Overlay = Overlay;

/**
 * Return a new `Overlay` with the given `options`.
 *
 * @param {Object|Element} options
 * @return {Overlay}
 * @api public
 */

function overlay(options){
  options = options || {};

  // element
  if (options.nodeName) {
    options = { target: options };
  }

  return new Overlay(options);
}

/**
 * Initialize a new `Overlay`.
 *
 * @param {Object} options
 * @api public
 */

function Overlay(options) {
  Emitter.call(this);
  options = options || {};
  this.target = options.target || document.body;
  this.closable = options.closable;
  this.el = domify(el('.overlay.hidden'));
  if (this.closable) {
  	this.el.addEventListener('click', this.hide.bind(this));
    this.el.classList.add('closable');
  }
}

/**
 * Mixin emitter.
 */

Emitter(Overlay.prototype);

/**
 * Show the overlay.
 *
 * Emits "show" event.
 *
 * @return {Overlay}
 * @api public
 */

Overlay.prototype.show = function(){
  var self = this;

  this.emit('show');
  this.target.appendChild(this.el);

  //class removed in a timeout to save animation
  setTimeout(function () {
  	self.el.classList.remove('hidden');
  });

  return this;
};

/**
 * Hide the overlay.
 *
 * Emits "hide" event.
 *
 * @return {Overlay}
 * @api public
 */

Overlay.prototype.hide = function(){
  this.emit('hide');
  return this.remove();
};

/**
 * Hide the overlay without emitting "hide".
 *
 * Emits "close" event.
 *
 * @return {Overlay}
 * @api public
 */

Overlay.prototype.remove = function(){
  var self = this;
  this.emit('close');
  this.el.classList.add('hidden');
  setTimeout(function(){
    self.target.removeChild(self.el);
  }, 350);
  return this;
};

