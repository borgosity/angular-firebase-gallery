export class Upload {
  $key: string;
  url: string;
  name: string;
  album: string;
  caption: string;
  collection: string;
  progress: number;
  createdOn: Date;

  constructor() {
    this.createdOn = new Date();
    this.$key = this.createdOn.toDateString(); 
  }
}
