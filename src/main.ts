import { Component, NgModule, Input } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

class Joke { 
  setup: string;
  punchline: string;
  hide:boolean;

  constructor(setup: string, punchline:string){
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }

 toggle(){
    this.hide = !this.hide;
  }
}

@Component({
selector: 'joke',
template: `
    <div class="card card-block">
  <div class="card-body">
    <h5 class="card-title">{{ joke.setup }}</h5>
  <p class = "card-text" [hidden]=joke.hide>{{ joke.punchline }}</p>
    <button class="btn btn-danger btn-sm" (click)=joke.toggle()>Toggle</button>
  </div>
</div>

`
})
class JokeComponent { 
  @Input() joke: Joke;
}

@Component({
  selector: 'joke-list',
  template:` 
  <joke *ngFor = "let j of jokes" [joke] = "j"></joke>`
})

class JokeListComponent { 
  jokes: Object[];

  constructor(){ 
    this.jokes = [
     new Joke("Test 1","Test 2"),
     new Joke("Test 3","Test 4"),
     new Joke("Test 5","Test 6")
    ]
}
}

@Component({
  selector: 'app',
  template: `<joke-list><joke-list>`
})

class AppComponent{}

@NgModule({
  imports:[BrowserModule],
  declarations:[JokeComponent, JokeListComponent, AppComponent],
  bootstrap:[AppComponent]
})

class AppModule{ }

platformBrowserDynamic().bootstrapModule(AppModule);