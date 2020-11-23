declare module 'amuse' {
  type MetaObject = Partial<{
    title: string;
    artist: string;
    album: string;
  }>

  type Muse = {
    src: string;
    id: string;
    meta: MetaObject;
    audio: HTMLAudioElement;
  }

  type MuseEvent = 'play' | 'pause' | 'stop' | 'seek' | 'next' | 'previous'
                  | 'skip' | 'playing' | 'load' | 'error';

  export default class Amuse {
    constructor(src?: string, id?: string, meta?: MetaObject, load?: boolean);

    /**
     * Adds new muse at the end of the playlist.
     */
    addMuse(src: string, id: string, meta?: MetaObject, load?: boolean):
    Promise<void>;
  
    /**
     * Removes muse by `id`, stops it if its the current one and selects the
     * next muse or the previous one (if the latter doesn't exist).
     */
    removeMuseById(id: string): Promise<void>;
  
    /**
     * Returns muse object that contains `src`, `id`, `meta` and the
     * corresponding `audio` <audio> element.
     */
    getMuseById(id: string): Muse | false;
  
    /**
     * If `id` is defined, loads muse with `id`. Otherwise loads currently
     * selected muse.
     */
    load(id: string): Promise<boolean>;
  
    play(): Promise<boolean>;
  
    pause(): Promise<boolean>;
  
    /**
     * Pauses and resets song to 0:00.
     */
    stop(): Promise<boolean>;
  
    /**
     * Return `false` if there is no muse after current one (otherwise `true` and
     * plays it).
     */
    next(): Promise<boolean>;
  
    /**
     * Same behaviour with `.next()`.
     */
    previous(): Promise<boolean>;
  
    /**
     * Skips to muse with `id`.
     */
    skipToId(id: string): Promise<boolean>;
  
    /**
     * Skips to muse with `index` (starts from 0).
     */
    skipToIndex(index: number): Promise<boolean>;
  
    /**
     * Removes all muses from playlist.
     */
    empty(): Promise<void>;
    
    /**
     * Empties playlist, sets amuse properties to defaults, removes event
     * listeners and UI elements. *This method is work in progress. Do not use
     * it in production builds.*
     */
    reset(): Promise<void>;
  
    addEventListener(event: MuseEvent, callback: Function): void;
  
    removeEventListener(event: MuseEvent, callback: Function): void;
  
    on(event: MuseEvent, callback: Function): void;
  
    notOn(event: MuseEvent, callback: Function): void;
  
    once(event: MuseEvent, callback: Function): void;
  
    /**
     * This method can be used to add one (or multiple) seek bar which the user can drag (to seek) and which gets updated every second.
     * @param outer element with the maximum (fixed) width of the bar.
     * @param inner seek bar that is contained in outer and will be transformed. (inner.style.width = '--%' is used).
     * @param initialPercentage the initial width (in %) of inner when nothing is playing yet.
     */
    addSeekBar(outer: HTMLElement, inner: HTMLElement, initialPercentage?: number): void;
  
    /**
     * This method allows you to automaticaly update timestamps in the `innerText` of elements.
     * @param type One of the following:
     * 
     * `'currentTime'`: `innerText` will be the current time of the selected muse (e.g. 1:01 if the selected muse is at 1m1s).
     * 
     * `'durationTime'`: `innerText` will be the full length of the selected muse (e.g. 3:45 if the total length is 3m45s).
     * 
     * `'completeTime'`: `currentTime` and `durationTime` combined (for the aformentioned values this element's `innerText` would be 1:01/3:45).
     * 
     * @param el the DOM element.
     */
    addElement(type: 'currentTime' | 'durationTime' | 'completeTime', el: HTMLElement): void;
  
    /**
     * True if selected muse has loaded
     */
    readonly loaded: boolean;
  
    readonly playing: boolean; 
  
    readonly paused: boolean;
  
    /**
     * Duration (in seconds) of selected muse.
     */
    readonly duration: number;
  
    /**
     * Get and set current time of selected muse in seconds.
     */
    currentSeconds: number;
  
    /**
     * Get and set current time of selected muse in percentage (<=1 and >=0).
     */
    currentPercentage: number;
  
    /**
     * Current muse object (contains `src`, `id`, `meta`, `audio` element)
     */
    readonly currentMuse: Muse;
  
    /**
     * If `true`, after the end of a muse, the next one is automatically
     * played. Defaults to `false`.
     */
    autoPlay: boolean;

    /**
     * If `true`, when skipping to another muse and returning to the first one,
     * muse will continue playing from where it had left of. Defaults to `true`.
     */
    rememberTime: boolean;
  }
}
