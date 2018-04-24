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
