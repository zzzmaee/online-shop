export interface IProducts {
  id: number;
  title: string;
  price: number;
  year: number;
  image?: string;
  configure: IProductsConfigure;
}

export interface IProductsConfigure {
  chip: string;
  SSD: string;
  memory: string;
  display: string;
}
