import { Component, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

@Component({
selector: 'joke',
template: `<h1>Ryan's Jokes </h1>
<p>How did the chicken cross the road?
I Dunno!</p>
`
})

class JokeComponent { 

}

@NgModule({
  imports:[BrowserModule],
  declarations:[JokeComponent],
  bootstrap:[JokeComponent]

})

class AppModule{ 

}

platformBrowserDynamic().bootstrapModule(AppModule);