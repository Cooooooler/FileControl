export type TEvent = "StartWaiting" | "StopWaiting";

class EventEmitter {
  private events: Record<TEvent, Set<Function>> = {
    StartWaiting: new Set(),
    StopWaiting: new Set(),
  };

  // 注册事件监听器
  public on(event: TEvent, listener: Function): void {
    if (!this.events[event]) {
      this.events[event] = new Set<Function>();
    }
    this.events[event].add(listener);
  }

  // 触发事件
  public emit(event: TEvent, ...args: any[]): void {
    const listeners = this.events[event];

    if (listeners) {
      listeners.forEach((listener) => listener(...args));
    }
  }

  // 移除事件监听器
  public off(event: TEvent, listener: Function): void {
    if (!this.events[event]) return;

    this.events[event].delete(listener);
  }
}

export default new EventEmitter();
