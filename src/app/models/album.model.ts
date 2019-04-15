export class Album {
  $key?: string;
  name?: string;
  size?: number;

  constructor(name : string) {
    this.$key = '0000000000000000000000000000000000000';
    this.name = name;
  }
}
