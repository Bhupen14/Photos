import { Component,OnInit } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public data:DataService){}

  
  ngOnInit()
  {
    this.data.getMessage().subscribe(
      res => {console.log(res);},
      err => {console.log(err);}
    )


  }
}
