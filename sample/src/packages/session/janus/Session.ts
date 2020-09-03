import Session from '../abc/Session';
import Publisher from '../abc/Publisher';
import JanusConnection from './Connection';
import JanusPublisher from './Publisher';
import { SessionListener, SessionSettings } from '../types/Session';
import { ConnectionState } from '../types/Connection';
import { CVSError } from '../types/common';
import { Message } from './types';

/// Janus implementation on session
export default class extends Session {
  private janusConnection: JanusConnection;

  constructor(settings: SessionSettings, listener?: SessionListener) {
    super(settings, listener);
    this.janusConnection = new JanusConnection(settings);
  }

  /// Renews connection
  protected createConnection(): JanusConnection {
    if (this.connection && this.connection.state !== ConnectionState.Closed)
      throw new CVSError('Previous connection is not close, but request renew');
    this.janusConnection = new JanusConnection(this.settings, this.onMessage);
    return this.janusConnection;
  }

  /// Starts publishing
  protected async startPublishing(publisher: Publisher): Promise<void> {
    if (publisher instanceof JanusPublisher) {
      await publisher.startPeer(this.janusConnection);
    } else throw new CVSError('Incorrect publisher type');
  }

  /// Stops publishing
  protected async stopPublishing(publisher: Publisher): Promise<void> {
    if (publisher instanceof JanusPublisher) {
      await publisher.stopPeer();
    } else throw new CVSError('Incorrect publisher type');
  }

  private onMessage(message: Message) {
    // ToDo: Process events
  }
}
