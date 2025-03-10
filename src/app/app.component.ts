import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { CommonModule } from '@angular/common'; // Import this

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule],
})
export class AppComponent implements OnInit, OnDestroy {

  accountStatus: Map<string, Object> = new Map();

  private socket!: WebSocketSubject<any>;

  private wsUrl = 'ws://localhost:5011/ws';

  ngOnInit() {

    this.socket = new WebSocketSubject(this.wsUrl);

    this.socket.subscribe(
      (data: any) => {
        if (data != null) {

          let account = {
            accountId: data.accountID,
            accountLimit: data.accountLimit
          }
          let status = {
            account: account,
            businessPhone: data.array
          }

          this.accountStatus.set(data.accountID, status);

        }
      },
      error => {
        console.error('WebSocket error:', error);
      }
    );
  }
  get mapEntries() {
    return Array.from(this.accountStatus.entries());
  }
  
  ngOnDestroy() {
    if (this.socket) {
      this.socket.unsubscribe();
    }
  }
}
