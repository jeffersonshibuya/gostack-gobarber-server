interface ITemplateVaribles {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  file: string;
  varibles: ITemplateVaribles;
}
