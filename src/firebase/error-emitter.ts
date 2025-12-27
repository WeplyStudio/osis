import { EventEmitter } from 'events';

// Create a global event emitter
// Next.js might clean up the global scope in dev mode, so we attach it to the window object.
declare global {
  var errorEmitter: EventEmitter | undefined;
}

const errorEmitter = globalThis.errorEmitter ?? new EventEmitter();

if (process.env.NODE_ENV !== 'production') {
  globalThis.errorEmitter = errorEmitter;
}

export { errorEmitter };
