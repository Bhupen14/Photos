import { Component,OnInit } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  serverData ="";
  constructor(public data:DataService){}

  
  ngOnInit()
  {
    this.data.getMessage().subscribe(
      res => {this.serverData = res.ms;},
      err => {console.log(err);}
    )


  }
}
