/**
 * A utility type that represents a listener function.
 */
export type Listener<T> = (data: T) => void;

/**
 * A simple type-safe event emitter class.
 */
export default class EventEmitter<T> {
  /**
   * A map of event names to a set of listeners.
   */
  private listeners: Map<string, Listener<T>[]> = new Map();
  private allListeners: Listener<T>[] = [];

  /**
   * Emit an event with some data.
   * @param event The event name.
   * @param data The data to pass to the listeners.
   */
  public emit(event: string, data: T) {
    const listeners = this.listeners.get(event);

    if (listeners) {
      for (const listener of listeners) {
        listener(data);
      }
    }

    for (const listener of this.allListeners) {
      listener(data);
    }
  }

  /**
   * Remove a listener from an event.
   * @param event The event name.
   * @param listener The listener to remove.
   */
  public off(event: string, listener: Listener<T>) {
    const listeners = this.listeners.get(event);

    if (listeners) {
      listeners.splice(listeners.indexOf(listener), 1);
    }
  }

  /**
   * Remove all listeners from an event.
   * @param event The event name.
   */
  public offAll(event: string) {
    this.listeners.delete(event);
  }

  /**
   * Add a listener to an event.
   * @param event The event name.
   * @param listener The listener to add.
   */
  public on(event: string, listener: Listener<T>) {
    const listeners = this.listeners.get(event) ?? [];
    listeners.push(listener);

    this.listeners.set(event, listeners);
  }

  /**
   * Add a listener to an event. The listener will only be called once before being removed.
   * @param event The event name.
   * @param listener The listener to add.
   */
  public once(event: string, listener: Listener<T>) {
    const onceListener = (data: T) => {
      listener(data);
      this.off(event, onceListener);
    };

    this.on(event, onceListener);
  }

  /**
   * Add a listener that will be called for all events. Note that this listener will be called after the event-specific listeners.
   * @param listener The listener to add.
   */
  public onAll(listener: Listener<T>) {
    this.allListeners.push(listener);
  }

  /**
   * Remove all listeners that were added with `onAll`.
   */
  public offAllListeners() {
    this.allListeners = [];
  }
}
