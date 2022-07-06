export declare class EventEmitter<
  T extends {
    [x: string]: (...args: any[]) => void;
  },
> {
  #private;
  once: (key: keyof T, value: T[keyof T]) => void;
  emit: (key: keyof T, ...args: Parameters<T[keyof T]>) => void;
  on: (key: keyof T, value?: T[keyof T] | undefined) => void;
  off: (key: keyof T) => void;
  delete: (key: keyof T) => void;
}
