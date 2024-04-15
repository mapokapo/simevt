# simevt

A simple event emitter for Javascript runtimes and the browser.

## Installation

### npm

```sh
npx jsr add @mapokapo/simevt
```

### Deno

```sh
deno add @mapokapo/simevt
```

### Bun

```sh
bunx jsr add @mapokapo/simevt
```

## Usage

```ts
import EventEmitter from "@mapokapo/simevt";
// or in Deno
import EventEmitter from "jsr:@mapokapo/simevt@^0.1.0";

const myEmitter = new EventEmitter<string>();

const myEventHandler = (data: string) => {
  console.log("My Event Data: " + data);
};

const myOtherEventHandler = (data: string) => {
  console.log("My Other Event Data: " + data);
};

myEmitter.emit("myEvent", "foo"); // nothing happens

myEmitter.on("myEvent", myEventHandler);
myEmitter.on("myOtherEvent", myOtherEventHandler);

myEmitter.emit("myEvent", "foo"); // My Event Data: foo
myEmitter.emit("myOtherEvent", "bar"); // My Other Event Data: bar

myEmitter.off("myEvent", myEventHandler);
myEmitter.emit("myEvent", "foo"); // nothing happens
myEmitter.emit("newEvent", "bar"); // nothing happens

myEmitter.on("myOtherEvent", myOtherEventHandler);
myEmitter.emit("myOtherEvent", "bar"); // My Other Event Data: bar\nMy Other Event Data: bar

myEmitter.offAll("myOtherEvent");
myEmitter.emit("myOtherEvent", "foo"); // nothing happens
```
