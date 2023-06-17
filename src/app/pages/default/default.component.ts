import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {

  searchValue: any;
  inputValue?: string;
  filteredOptions: any[] = [];
  options: any[] = [];
  constructor(private service: SharedService) {
    this.filteredOptions = this.options;
  }

  ngOnInit(){
    this.service.getSnippets().subscribe(data=>{
      this.options = data;
    })
  }
  onChange(value: string): void {
    this.filteredOptions = this.options.filter(option => option.title.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

}
