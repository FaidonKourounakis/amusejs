# Amuse.js 
**Simple `<audio>` wrapper library** to play sounds/music, using async/await on the frontend!  

Takes away the pain of coding a **seek bar** for your music player, manages songs in a way that **doesn't require reloading** them, with plenty of **event to listen to** and more!
Now with **typescript support**! How cool is that?  
## Install
```bash
npm install amuse --save
```
```javascript
import Amuse from 'amusejs';
```
## Quickstart
Initialise amuse player without any songs (aka muses) and add your first muse:
```javascript
let src = 'https://res.cloudinary.com/faidondev/video/upload/v1576323386/Maelstrom%20high%20quality/een%20flamboyant%20gevoelsfestijn/15_Het_groot_Aardbeienlied_uyu0xu.mp3',
    id = 'song1',
    meta = { title: 'Aardbeilied', artist: 'Maelstrom', album: 'Flamboyant Gevoelsfestijn'},
    load = true;

let amuse = new Amuse();
amuse.addMuse(src, id, meta, load);

// shorthand:
let amuse = new Amuse(srd, id, meta, load);

await amuse.play();
```

- `id`: (required) Unique identifier of muse (song or sound) which you'll need later on.
- `src`: URL to mp3 file.
- `meta`: (optional) object with meta data of mp3 file (or really whatever data you wanna store). 
- `load`: (optional, defaults to true) if true loads audio file upon muse addition, if false loads audio file later (automatically when played or manually ...read further).

## Methods
#### Muses

```javascript
await amuse.addMuse(src, id, meta, load);
```
Adds new muse at the end of the playlist.

```javascript
await amuse.removeMuseById(id);
```
Removes muse by `id`, stops it if its the current one and selects the next muse or the previous one (if the latter doesn't exist).

```javascript
amuse.geMuseById(id); // of the few sync methods
```
Returns muse object that contains `src`, `id`, `meta` and the corresponding `<audio>` element. 

```javascript
await amuse.empty(); 
```
Removes all muses from playlist.
```javascript
await amuse.reset(); 
```
Empties playlist, sets amuse properties to defaults, removes event listeners and UI elements. 
*This method is work in progress. Do not use it in production builds.*

#### Controls

```javascript
await amuse.load(id);
```

If `id` is defined, loads muse with `id`. Otherwise loads currently selected muse.
```javascript
await amuse.play();
```

```javascript
await amuse.pause();
```

```javascript
await amuse.stop();
```
Pauses and resets song to 0:00.

```javascript
await amuse.next();
```
Return false if there is no muse after current one (otherwise true and plays it).

```javascript
await amuse.previous(); 
```
Same behaviour with `.next()`.

```javascript
await amuse.skipToIndex(index); 

```
Skips to muse with `index` (starts from 0).

```javascript
await amuse.skipToId(id); 
```
Skips to muse with `id`.

#### Events

```javascript
amuse.addEventListener(event, callback); 
// same as 
amuse.on(event, callback);
// or to only fire once:
amuse.once(event, callback);
```
Callback function receives amuse instance as argument.
`event` is one of the following:
- `'play'`: fires when a muse has started playing,
- `'pause'`: fires when a muse is paused,
- `'stop'`: fires at stop,
- `'seek'`: fires when muse is being seeked,
- `'next'`: fires when the next muse gets played,
- `'previous'`: fires when the previous muse gets played,
- `'skip'`: fires when the playing muse changes,
- `'playing'`: fires constantly while a muse is playing,
- `'load'`: fires when a muse is loaded,
- `'error'`: fires when a muses \<audio> element fires an error.

```javascript
amuse.removeEventListener(event, callback); 
// same as
amuse.notOn(event, callback);
```

#### UI Elements

```javascript
amuse.addSeekBar(outer, inner, initialPercentage);
```
This method can be used to add one (or multiple) seek bar which the user can drag (to seek) and which gets updated every second. 
- `outer`: (DOM element) element with the maximum (fixed) width of the bar
- `inner`: (DOM element) seek bar that is contained in outer and will be transformed. (`inner.style.width = '--%'` is used)
- `initialPercentage`: the initial width (in %) of `inner` when nothing is playing yet.

```javascript
amuse.addElement(type, el);
```
This method allows you to automaticaly update timestamps in the `innerText` of elements.
`type` is one of the following:
- `'currentTime'`: `innerText` will be the current time of the selected muse (e.g. 1:01 if the selected muse is at 1m1s)
- `'durationTime'`: innerText will be the full length of the selected muse (e.g. 3:45 if the total length is 3m45s)
- `'completeTime'`: `currentTime` and `durationTime` combined (for the aformentioned values this element's innerText would be 1:01/3:45)
`el`: the DOM element.

## Properties

#### Writable

```javascript
amuse.autoPlay = true;
```
If true, after the end of a muse, the next one is automatically played. Defaults to `false`.

```javascript
amuse.rememberTime = false;
```
If true, when skipping to another muse and returning to the first one, muse will continue playing from where it had left of. Defaults to `true`.

```javascript
let t = amuse.currentSeconds
amuse.currentSeconds = 89;
```
Get and set current time of selected muse in seconds.

```javascript
let p = amuse.currentPercentage
amuse.currentSeconds = .75;
```
Get and set current time of selected muse in percentage (<=1 and >=0).

#### Read only

```javascript
amuse.currentMuse
```
Current muse object (contains src, id, meta, audio element)

```javascript
amuse.loaded
```
True if selected muse has loaded

```javascript
amuse.playing
amuse.paused // same as !amuse.playing
```
```javascript
amuse.duration
```
Duration (in seconds) of selected muse.

