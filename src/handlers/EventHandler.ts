import { Event } from '../events/Event';
import UserEntryEvent from '../events/UserEntryEvent';
import UserExitEvent from '../events/UserExitEvent';

class EventHandler {
  private static events: Map<string, Event> = new Map();

  static registerEvent(event: Event) {
    this.events.set(event.name, event);
  }

  static async triggerEvent(eventName: string, data: any): Promise<void> {
    const event = this.events.get(eventName);
    if (!event) {
      throw new Error(`Event ${eventName} not registered.`);
    }
    await event.execute(data);
  }
}

// Registering events
EventHandler.registerEvent(new UserEntryEvent());
EventHandler.registerEvent(new UserExitEvent());

export default EventHandler;