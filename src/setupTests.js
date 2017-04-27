// @flow

import { JSDOM } from 'jsdom';

const exposedProperties = ['window', 'navigator', 'document'];
global.window = new JSDOM('<!DOCTYPE html><div id="root"/>').window;
global.document = global.window.document;
global.navigator = { userAgent: 'node.js' };

Object.keys(global.document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = global.document.defaultView[property];
  }
})
