
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// import {Clipboard} from '@angular/cd';
import { ApiService } from 'src/app/services/api.service';
// import copy from 'copy-to-clipboard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {
  @Input() weatherDetails: any;

  @ViewChild('copyBtn') copyBtn!: ElementRef;
  handleCopyToggle: boolean = true;
  constructor(private apiservice :ApiService) {}

  ngOnInit(): void {
    console.log(this.weatherDetails,"wea")
  }

  copyToClipboard() {
    navigator.clipboard.writeText(JSON.stringify(this.weatherDetails,null,2)).then(
      () => {
        if (this.copyBtn && this.copyBtn.nativeElement) {
          this.copyBtn.nativeElement.title = 'copied';
          this.handleCopyToggle = false;
          setTimeout(() => {
            this.handleCopyToggle = true;
            this.copyBtn.nativeElement.title = 'copy';
          }, 5000);
        }
      },
      (err) => {
        console.error('Error copying to clipboard:', err);
      }
    );
  }
}