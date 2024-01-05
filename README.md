
## The "Posts" Project 🤖

Hello there. This is an experimental Angular project for showcasing a few basic functionalities – hopefully executed in a nice way ;-)

### Specs
A few specs and notes on how I approached it:
- Currently, it uses RxJS for managing state;
- For styling, Tailwind;
- As a general approach, I prefer the code as declarative as possible;
- Test are written with Jest; to execute them, run `ng test` (the test coverage isn't quite there yet)

### Next up
If you come in the next days, make sure to checkout the [signals](../../tree/signals) branch where I experiment with managing state using Singals (or maybe a hybrid between Signals and RxJS).

### Dev server

This project uses Angular v17.0.0, so make sure to run it using a compatible node version. If you're using nvm, feel free to run `nvm use`.
When you're set, run `ng serve` for a dev server and navigate to `http://localhost:4200/`.
