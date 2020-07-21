export default interface IStorageProvder {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
