import type { User } from "@syncellus/types/database.js";
import { EventEmitter } from "events";

export interface AppEvents {
    "user.created": User;
    "user.deleted": { id: string };
}

export class EventBus {
    private emitter = new EventEmitter();

    on<K extends keyof AppEvents>(event: K, listener: (payload: AppEvents[K]) => void): void {
        this.emitter.on(event, listener);
    }

    emit<K extends keyof AppEvents>(event: K, payload: AppEvents[K]): void {
        this.emitter.emit(event, payload);
    }
}

export const eventBus = new EventBus();
