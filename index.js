const Emitter = require('component-emitter');

module.exports = overlay;
overlay.Overlay = Overlay;

/**
 * Return a new `Overlay` with the given `options`.
 *
 * @param {Object|Element} options
 * @return {Overlay}
 * @api public
 */

function overlay(options = {}) {
  // element
  if (options.nodeName) {
    options = { target: options };
  }

  return new Overlay(options);
}

class Overlay extends Emitter {
  /**
   * Initialize a new `Overlay`.
   *
   * @param {Object} options
   */

  constructor(options = {}) {
    super();
    this.target = options.target || document.body;
    this.closable = options.closable;
    this.el = document.createElement('div');
    this.el.className = 'overlay hidden';
    if (this.closable) {
      this.el.addEventListener('click', () => this.hide());
      this.el.classList.add('closable');
    }
  }

  /**
   * Show the overlay.
   *
   * Emits "show" event.
   *
   * @return {Overlay}
   */

  show() {
    this.emit('show');
    this.target.appendChild(this.el);

    // class removed in a timeout to save animation
    setTimeout(() => this.el.classList.remove('hidden'));

    return this;
  }

  /**
   * Hide the overlay.
   *
   * Emits "hide" event.
   *
   * @return {Overlay}
   */

  hide() {
    this.emit('hide');
    return this.remove();
  }

  /**
   * Hide the overlay without emitting "hide".
   *
   * Emits "close" event.
   *
   * @return {Overlay}
   * @api public
   */

  remove() {
    this.emit('close');
    this.el.classList.add('hidden');
    setTimeout(() => this.target.removeChild(self.el), 350);
    return this;
  }
}
