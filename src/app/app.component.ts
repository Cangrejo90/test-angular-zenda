import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TableContainerComponent } from './components/table-container/table-container.component';
import { RickAndMortyService } from './services/rickandmortyService';
import { Subscription } from 'rxjs';
import { Character, Result, ViewCharacter } from './models/character';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ViewCharacterComponent } from './components/view-character/view-character.component';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatCardModule,MatToolbarModule,
    TableContainerComponent,MatInputModule,MatFormFieldModule,
    MatSelectModule,MatButtonModule,ReactiveFormsModule,ViewCharacterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'test-angular-2';
  data: Result[] = [];
  status: Status[] = [
    {value: 'Alive', viewValue: 'Alive'},
    {value: 'unknown', viewValue: 'Unknown'},
    {value: 'Dead', viewValue: 'Dead'},
  ];
  name = new FormControl('');
  state = new FormControl('');
  prevUrl:string = "";
  nextUrl:string = "";
  disbledPrevButton: boolean = true;
  disbledNextButton: boolean = false;
  resultSelected:ViewCharacter = {
    id: 0,
    name: '',
    status: '',
    species: '',
    type: '',
    origin: '',
    location: '',
    image: '',
    episodes: [],
    characterOrigin: [],
    characterLocation: []
  };

  favoriteResult:ViewCharacter = {
    id: 0,
    name: '',
    status: '',
    species: '',
    type: '',
    origin: '',
    location: '',
    image: '',
    episodes: [],
    characterOrigin: [],
    characterLocation: []
  }
  totalType:number = 0;
  totalSpecies:number = 0;

  private readonly subscription = new Subscription();
  constructor(private readonly rickAndMortyService:RickAndMortyService){

  }

  ngOnInit(): void{
    this.subscription.add(this.rickAndMortyService.getAllCharacter().subscribe({
      next:(response:Character) => {
        this.processResponse(response);
      },error: (error:any) => {

      }
    }));
  }

  searchCharacter(){
    console.log(this.name.value);
    console.log(this.state.value);
  }

  prevCharacters(): void{
    this.updatePagination(this.prevUrl);
  }

  nextCharacters(): void{
    this.updatePagination(this.nextUrl);
  }

  updatePagination(url:string): void{
    this.subscription.add(this.rickAndMortyService.navegatePagination(url).subscribe({
      next:(response:Character) => {
        this.processResponse(response);
      },error: (error:any) => {

      }
    }));
  }

  processResponse(response:Character): void{
    this.data = response.results;
    this.prevUrl = response.info.prev;
    this.nextUrl = response.info.next;
    this.disbledPrevButton = this.prevUrl === null;
    this.disbledNextButton = this.nextUrl === null;
    this.totalSpecies = new Set(this.data.map(data => data.species)).size;
    this.totalType = new Set(this.data.map(data => data.type)).size;
  }

  openViewCharacter(event:any){
    const data = this.data[event.index];
    let countEpisode = 0;
    let countCharcterOrigin = 0;
    let countCharcterLocation = 0;

    const filteredEpisode = data.episode.filter(function() {
      if (countEpisode < 3) {
        countEpisode++;
        return true;
      }
      return false;
    }, {count: 0});

    const characterOrigin = this.data.filter(function(item) {
      if (countCharcterOrigin < 3 && item.origin.name === data.origin.name) {
        countCharcterOrigin++;
        return true;
      }
      return false;
    }, {count: 0});

    const characterLocation = this.data.filter(function(item) {
      if (countCharcterLocation < 3 && item.location.name === data.location.name) {
        countCharcterLocation++;
        return true;
      }
      return false;
    }, {count: 0});

    const origin = characterOrigin.map(co => co.name);
    const location = characterLocation.map(cl => cl.name);

    this.resultSelected = {
      id: data.id,
      name: data.name,
      status: data.status,
      species: data.species,
      type: data.type,
      origin: data.origin.name,
      location: data.location.name,
      image: data.image,
      episodes: filteredEpisode,
      characterOrigin:origin,
      characterLocation:location
    }
  }

  addFavorite(event:any): void{
    this.favoriteResult = event.result;
  } 
}
