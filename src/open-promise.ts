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
 * aPromiseWillBeResolvedLater.promise.then(val => console.log(val));
 * // aPromiseWillBeResolvedLater.finished // false
 * ...
 * ...
 *
 * aPromiseWillBeResolvedLater.resolve({x: 1});
 * // aPromiseWillBeResolvedLater.finished // true
 * ```
 * * * *
 * @template T typeof the value which will be resolved
 */
export class OpenPromise<T = any> {
	private _resolver: (param: T) => void;
  private _rejector: (error: any) => void;

  /**
   * The actual promise object itself
   */
	public promise: Promise<T>;

	private _resolved = false;
	private _rejected = false;

  /**
   * #### Open Promise Constructor
   */
	constructor() {
		this.promise = new Promise<T>((resolve, reject) => {
			this._resolver = resolve;
			this._rejector = reject;
		});
  }

  /**
   * Returns whether is the promise resolved
   */
  public get resolved(): boolean {
    return this._resolved;
  }

  /**
   * Returns whether is the promise rejected
   */
  public get rejected(): boolean {
    return this._rejected;
  }

  /**
   * Returns whether is the promise finished
   */
	public get finished(): boolean {
		return this._resolved || this._rejected;
	}

  /**
   * Resolves promise
   * @param param Value to resolve the promise
   */
	public resolve(param: T): void {
		this._resolved = true;
		this._resolver(param);
	}

  /**
   * Rejects promise
   * @param error Error to reject promise
   */
	public reject(error: any): void {
		this._rejected = true;
		this._rejector(error);
	}

  /**
   * Binds a promise to the inner promise to resolve or reject with it
   * @param promise A promise to bind inner promise
   */
	public bindPromise(promise: Promise<T> | T): void {
    if (promise instanceof Promise) {
      promise.then(e => this.resolve(e)).catch(e => this.reject(e));
    } else {
      this.resolve(promise);
    }
	}
}
