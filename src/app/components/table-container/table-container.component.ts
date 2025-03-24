import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { Result } from '../../models/character';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [MatTableModule,MatCardModule],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.scss'
})
export class TableContainerComponent {
  dataSource:InputSignal<Result[]> = input.required<Result[]>();
  displayedColumns: string[] = ['name', 'status', 'species', 'type','gender','created'];
  @Output() public clickTableEvent: EventEmitter<{ index:any }> = new EventEmitter();
  
  openCharacter(event:any){
    this.clickTableEvent.emit({index:event})
  }
}
