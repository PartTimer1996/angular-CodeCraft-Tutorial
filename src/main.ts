import { Component, NgModule, Input, EventEmitter, Output } from "@angular/core";
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
    <div class = "container">
    <div class="card card-block">
  <div class="card-body">
    <h5 class="card-title">{{ data.setup }}</h5>
  <p class = "card-text" [hidden]=data.hide>{{ data.punchline }}</p>
    <button class="btn btn-danger btn-sm" (click)=data.toggle()>Toggle</button>
  </div>
</div>
</div>
`
})
class JokeComponent { 
  @Input("joke") data: Joke;
}

@Component({
  selector: 'joke-form', 
  template: `<div class = container>
<div class="card card-block">
  <h4 class="card-title">Create Joke</h4>
  <div class = card-body>
  <div class="form-group">
    <input type="text"
           class="form-control"
           placeholder="Enter the setup"
           #setup>
  </div>
  <div class="form-group">
    <input type="text"
           class="form-control"
           placeholder="Enter the punchline"
           #punchline>
  </div>
    <button class="btn btn-danger btn-sm" (click)="createJoke(setup.value, punchline.value)">Create</button>
    </div>
</div>
</div>
`
})

class JokeFormComponent{
 @Output() jokeCreated = new EventEmitter<Joke>();

 createJoke(setup: string, punchline:string){
   this.jokeCreated.emit(new Joke(setup,punchline))
 }
}

@Component({
  selector: 'joke-list',
  template:` 
  <joke-form (jokeCreated)="addJoke($event)"></joke-form>
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

addJoke(joke){
  this.jokes.unshift(joke);
}

}

@Component({
  selector: 'app',
  template: `<joke-list><joke-list>`
})

class AppComponent{}

@NgModule({
  imports:[BrowserModule],
  declarations:[JokeComponent,JokeFormComponent , JokeListComponent, AppComponent],
  bootstrap:[AppComponent]
})

class AppModule{ }

platformBrowserDynamic().bootstrapModule(AppModule);