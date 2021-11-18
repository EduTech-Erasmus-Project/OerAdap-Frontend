import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class EventService {
  private event$: EventEmitter<boolean>;

  constructor() {
    this.event$ = new EventEmitter<boolean>();
  }

  emitEvent(value: boolean): void {
    this.event$.emit(value);
  }
  getEvent(): EventEmitter<boolean> {
    return this.event$;
  }
}
