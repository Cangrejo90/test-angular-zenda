import { Component, EventEmitter, model, ModelSignal, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ViewCharacter } from '../../models/character';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-view-character',
  standalone: true,
  imports: [MatListModule,MatCardModule,MatButtonModule,MatIconModule],
  templateUrl: './view-character.component.html',
  styleUrl: './view-character.component.scss'
})
export class ViewCharacterComponent {
  @Output() public clickAddFavorite: EventEmitter<{ result: ViewCharacter}> = new EventEmitter();
    
  result: ModelSignal<ViewCharacter> = model<ViewCharacter>({
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
  });

  addFavorite(){
    this.clickAddFavorite.emit({result:this.result()})
  }
}
