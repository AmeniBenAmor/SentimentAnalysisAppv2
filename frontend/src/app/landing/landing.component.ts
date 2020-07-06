import { Component, ViewChild, AfterViewInit, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { EmitType, detach } from '@syncfusion/ej2-base';
import {DataService} from "../data.service";
import {NgForm} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  DataType,
  ReturnType
} from "../type";
@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
filtersLoaded: Promise<boolean>;

  files: any = [];

  
  closeResult: string;



  ReceivedData: ReturnType={
    text: '',
    prediction: ''
}
  isCompleted: boolean = false;
  
  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }  
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }
   onSubmit(f: NgForm) {
    this.ReceivedData.prediction=''
    var body= JSON.stringify(f.value)
    this.dataService.predict(body).subscribe(data => {
      this.ReceivedData = data 
      console.log(this.ReceivedData);
    })
  }
  public test() {
  // this.dataService.predict().subscribe((data : string) => {
     //   this.HW = data;
      //  console.log("text",data)
  //  });
  }
  open(content, type, modalDimension) {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    
}

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
}
  constructor(private modalService: NgbModal,private dataService: DataService) {
   
   } 

  ngOnInit() {}

}
