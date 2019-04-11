export class Upload {
  $key?: string;
  url: string;
  collection: string;
  name: string;
  progress: number;
  createdOn: Date;

  constructor() {
    this.createdOn = new Date();
  }
}
