import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketSubject } from 'rxjs/webSocket';
import { CommonModule } from '@angular/common'; // Import this
export interface Message {
  phone: number;
  count: number;
  ttl: any;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [ CommonModule],
})
export class AppComponent implements OnInit, OnDestroy {
  serviceStatus: any;
   numberCount: Map<number, number> = new Map();

  ttl:any;
  private socket!: WebSocketSubject<any>;
  private wsUrl = 'ws://localhost:5011/ws';

  ngOnInit() {    
    this.socket = new WebSocketSubject(this.wsUrl);
    this.socket.subscribe(
      (data: Message) => {
        if(data.count!=0)      
      this.numberCount.set(data.phone,data.count);
      this.ttl = data.ttl
        this.serviceStatus = {
          phone: data.phone,
          count: data.count,
          ttl: data.ttl,
                };
      },
      error => {
        console.error('WebSocket error:', error);
      }
    );
  }
  get mapEntries() {
    return Array.from(this.numberCount.entries());
  }
  ngOnDestroy() {
    if (this.socket) {
      this.socket.unsubscribe();
    }
  }
}
