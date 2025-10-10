// core/event-handler.ts
import type { AppEvents, EventBus } from "@syncellus/core/eventBus.js";

export abstract class EventHandler<K extends keyof AppEvents> {
    constructor(protected readonly eventBus: EventBus) {}

    abstract eventName(): K;
    abstract handle(payload: AppEvents[K]): Promise<void> | void;

    register(): void {
        this.eventBus.on(this.eventName(), this.handle.bind(this));
    }
}
