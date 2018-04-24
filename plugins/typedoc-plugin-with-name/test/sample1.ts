/**
 * doc de la clase
 */
export class Class1{
  /**
   * doc de prop
   */
  color: string;
  /**
   * doc de evento
   * @event
   * @name customEvent
   */
  addListener(name:string, listener:(data) => void):void {

  }
  /**
   * doc de method1
   */
  method1() {}
}


export interface Cart {
  /**
   * Register given listener function to be notified when the user add the items to the cart 
   * @event
   * @name before:add-to-cart
   * @param listener accepts the items that the user had intention to add to the cart and 
   * a promise that will be resolved when the transaction is fulfilled or rejected 
   * otherwise. Also the listener have the possibility to asynchronously validate 
   * the transaction yb returning a promise. If so the transaction won't start 
   * unless the promise is resolved (could be useful to validate with third parties 
   * providers)
   */
  addListener(listener:(items:IItem[], transaction:Promise<ITransaction>) => Promise<boolean>):void;
}

export interface IItem{
  quantity: number;
  options: number[];
  id: number;
}

export interface ITransaction{
  id: string;
  lines: IItem[];
}



/** 
 * In tis description I want to write annotations but escaped, I dont know how, let's try @myannotationshoudnotbeparsed  ad??
 * 
 * Responsible of notifying relevant events about downloading stuff. Instances can be obtained like this: 
 * ```
 *  const downloadEmitter = Factory.getInstance<IDownloadEventEmitter>('IDownloadEventEmitter');
 * ```
 */
export interface IDownloadEventEmitter{



  /**
   * Subscribes given listener so it will be called when the progress of the download changes
   * @event
   * @name progress
   * @param eventName The name of the event to subscribe for.
   * @param handler A handler that will receive a progress event with the current and expected 
   * total bytes
   */
  on(eventName: 'progress', listener: (event: DownloadProgressEvent) => void): this;

  /**
   * Subscribes given listener so it will be called when the download finished
   * @event
   * @name finish
   * @param event The name; of the event to subscribe for.
   * @param handler A handler that will receive a progress event with the current and expected 
   * total bytes
   */
  on(eventName: 'finish', listener: (event: DownloadFinishEvent) => void): this;

  /**
   * Subscribes given listener so it will be called when the download finished
   * @event
   * @name error
   * @param event The name of the event to subscribe for.
   * @param handler A handler that will receive a progress event with the current and expected 
   * total bytes
   */
  on(eventName: 'error', listener: (event: Error) => void): this;


  /**
   * This method might trigger [[error]] event in case something goes wrong or if it rains. Also susceptible of triggering [[progress]] event ro indicate how is goind and [[finish]] when is done ni which case resolve returned
   * @param config 
   */
  startDownloading(config: IDownloadConfig): Promise<any>;
  
}


/**
 * abstract super interface of all download-related events
 */
export interface DownloadEvent  {
  timestamp: Date;
  id: string;
}
/**
 * data with progress information
 */
export interface DownloadProgressEvent extends DownloadEvent {
  name: string;
  value: number;
  code: number[];
}
/**
 * event emitted when a download finished
 */
export interface DownloadFinishEvent extends DownloadEvent {
  totalBytes: number;
  ips: number[][];
}
/**
 * event emitted When something goes wrong
 */
export interface DownloadError extends DownloadEvent {
  status: number;
  error: Error;
}
/**
 * Configuration for a download, see [[IDownloadEventEmitter.startDownloading]]
 */
export interface IDownloadConfig {
  abortOnError: boolean;
}
class DownloadConfig implements IDownloadConfig {
  abortOnError: boolean;
}
