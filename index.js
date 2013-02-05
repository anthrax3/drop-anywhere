
/**
 * Module dependencies.
 */

var Dropload = require('dropload')
  , events = require('events');

module.exports = DropAnywhere;

function DropAnywhere(fn) {
  if (!(this instanceof DropAnywhere)) return new DropAnywhere(fn);
  var self = this;
  this.el = document.createElement('div');
  this.el.id = 'drop-anywhere';
  this.events = events(this.el, this);
  this.docEvents = events(document.body, this);
  this.events.bind('dragleave');
  this.docEvents.bind('dragenter');
  this.drop = Dropload(this.el);
  this.drop.on('error', fn);
  this.drop.on('upload', function(upload){
    self.ondragleave();
    fn(null, upload);
  });
}

DropAnywhere.prototype.ondragenter = function(){
  document.body.appendChild(this.el);
};

DropAnywhere.prototype.ondragleave = function(){
  document.body.removeChild(this.el);
};

DropAnywhere.prototype.unbind = function(){
  this.drop.unbind();
  this.events.unbind();
  this.docEvents.unbind();
};
