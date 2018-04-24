/** a second event emitter */
interface SecondAttemptEmitter{
  /** start the engines of this emitter, probably firing a [[beforeEngineStart]] event */
  startEngines();
}
/**
 * @asMemberOf SecondAttemptEmitter
 * @event
 * @param x 
 */
declare function beforeEngineStart(engineData: {suit: string; card: number; }[]): number;



// 
// And now a lst attempt, using [typedoc-plugin-as-member-of](https://github.com/cancerberoSgx/typedoc-plugins-of-mine/tree/master/plugins/typedoc-plugin-as-member-of) typedoc plugin we will declare events as separate funcions and using the annotation @asMemberOf those functioned will be moved as members of the host class `Vehicle`. Because we annotated the functions with `@event` the plugin will also mutate de functions to events. 
/**
 * A machine for transportation
 */
interface Vehicle{
  /** I you want to start moving. It's the main cause of events [[beforeStart]] and [[afterStop]] event emissions.  */
  start();
}
/**
 * @asMemberOf Vehicle
 * @event
 * @param x 
 */
declare function beforeStart(engineData: {suit: string; card: number; }[]): Promise<boolean>;

/**
 * @asMemberOf Vehicle
 * @event
 * @param x 
 */
declare function afterStop(stopReason: 'gas'|'fail', position: {x:number, y:number}): void;
