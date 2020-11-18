import { noop } from './function';

type Resolver<T> = (value?: T) => any;
type Rejector = (reason?: any) => any;
type PromiseExecutor<T> = (resolve: Resolver<T>, reject: Rejector) => any;

const RESOLVED = Symbol('Open Promise Resolved');
const REJECTED = Symbol('Open Promise Rejected');

let resolver: Resolver<any>;
let rejector: Rejector;

/**
 * #### Open Promise
 * A promise constructor to resolve or reject from outside
 *
 * * * *
 * Example:
 * ```typescript
 * import { OpenPromise } from "@thalesrc/js-utils";
 *
 * const aPromiseWillBeResolvedLater = new OpenPromise();
 *
 * aPromiseWillBeResolvedLater.then(val => console.log(val));
 * // aPromiseWillBeResolvedLater.finished // false
 * ...
 * ...
 *
 * aPromiseWillBeResolvedLater.resolve({x: 1});
 * // aPromiseWillBeResolvedLater.finished // true
 * ```
 * * * *
 * @template T typeof the value which is going to be resolved
 */
export class OpenPromise<T = any> extends Promise<T> {
  private [RESOLVED] = false;
  private [REJECTED] = false;

  /**
   * Resolves promise
   * @param value Value to resolve the promise
   */
  public resolve: Resolver<T>;

  /**
   * Rejects promise
   * @param reason Error to reject promise
   */
  public reject: Rejector;

  /**
   * Open Promise Constructor
   */
  constructor(executor: PromiseExecutor<T> = noop) {
    super((resolve, reject) => {

      resolver = new Proxy(noop, {
        apply(t, c, [value]) {
          this.context[RESOLVED] = true;
          resolve(value);
        },
        set(t, prop, value) {
          if (prop !== 'context') {
            return false;
          }

          this.context = value;

          return true;
        }
      });

      rejector = new Proxy(noop, {
        apply(t, c, [reason]) {
          this.context[REJECTED] = true;
          reject(reason);
        },
        set(t, prop, value) {
          if (prop !== 'context') {
            return false;
          }

          this.context = value;

          return true;
        }
      });

      executor.call(null, resolver, rejector);
    });

    resolver['context'] = this;
    rejector['context'] = this;

    this.resolve = resolver;
    this.reject = rejector;
  }

  /**
   * Returns whether is the promise resolved
   */
  public get resolved(): boolean {
    return this[RESOLVED];
  }

  /**
   * Returns whether is the promise rejected
   */
  public get rejected(): boolean {
    return this[REJECTED];
  }

  /**
   * Returns whether is the promise finished
   */
  public get finished(): boolean {
    return this[RESOLVED] || this[REJECTED];
  }

  /**
   * Binds a promise to the inner promise to resolve or reject with it
   * @param promise A promise to bind inner promise
   */
  public bindTo(promise: Promise<T>): void {
    if (promise instanceof Promise) {
      promise.then(e => this.resolve(e)).catch(e => this.reject(e));
    } else {
      this.resolve(promise);
    }
  }
}
