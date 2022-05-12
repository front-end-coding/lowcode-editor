export interface ICategory {
  name: string;
}

export interface IMeterialData {
  /** 版本 */
  version: string;
  /** 物料源url */
  source: string;
}

export interface IMaterial extends IMeterialData {
  id: number;
  name: string;
  title: string;
  //缩略图
  thumbnail: string;
  type: string;
  categoty: ICategory;
  data: IMeterialData[];
}

export interface IMaterialLoader {
  type: string;
  load(material: IMaterial): Promise<any>
}

