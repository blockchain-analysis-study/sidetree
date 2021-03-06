import Config from './models/Config';
import MongoDbOperationQueue from './versions/latest/MongoDbOperationQueue';

/**
 * An class to monitor the Core.
 * NOTE: this class is completely decoupled from Core, Core does not depend on this class at all for it to function.
 */
export default class Monitor {

  private operationQueue: MongoDbOperationQueue;

  public constructor () {
    this.operationQueue = new MongoDbOperationQueue();
  }

  public async initialize (config: Config) {
    this.operationQueue.initialize(config.mongoDbConnectionString, config.databaseName);
  }

  /**
   * Gets the size of the operation queue.
   */
  public async getOperationQueueSize (): Promise<number> {
    const queueSize = await this.operationQueue.getSize();
    return queueSize;
  }
}
