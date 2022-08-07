import { Injectable } from '@angular/core';

import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { ArtEvent } from '../interfaces/art-event';

export interface EventState extends EntityState<ArtEvent, string>, ActiveState {
  areEventsLoaded: false
  filter: string
}

export function createInitialState(): EventState {
  return {
    filter: 'ALL',
    areEventsLoaded: false,
    active: 0
  };
}

@Injectable({ providedIn: 'root'})
@StoreConfig({ name: 'artEvents', idKey: '_id', resettable: true})
export class EventStore extends EntityStore<EventState> {

  constructor() {
    super(createInitialState());
  }

  // Load events

  loadEvents(artEvents: ArtEvent[], areEventsLoaded: boolean) {

    this.set(artEvents);

    console.log(artEvents);

    this.update((state: any) => ({
      ...state,
      areEventsLoaded
    }));
  }

  // Set active entity

  // setActiveEntity(eventID: string | undefined) {

  //   this.setActive(eventID);
  // }
}


