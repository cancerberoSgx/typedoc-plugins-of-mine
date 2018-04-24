/**
 * a second event emitter
 */
interface SecondAttemptEmitter{
  startEngines();
}
/**
 * @asMemberOf SecondAttemptEmitter
 * @event
 * @param x 
 */
declare function beforeEngineStart(engineData: {suit: string; card: number; }[]): number;
