import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  serviceStatus: any;
  private socket!: WebSocketSubject<any>;
  private wsUrl = 'ws://localhost:5011/ws';
  // private wsUrl = 'ws://localhost:5000/ws';
  ngOnInit() {
    this.socket = new WebSocketSubject(this.wsUrl);
    this.socket.subscribe(
      (data: any) => {
        this.serviceStatus = {
          name: 'My .NET Service',
          online: data.online,
          lastChecked: data.timestamp
        };
      },
      error => {
        console.error('WebSocket error:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.unsubscribe();
    }
  }
}
