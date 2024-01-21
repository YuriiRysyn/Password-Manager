import { RequestStatusEnum } from "./enums";

export interface IItem {
  title: string;
  password: string;
}

// Items created on a Server
export interface IExtendedItem extends IItem {
  userId: string;
  id: string;
}

export interface IDashboardItems {
  requestStatus: RequestStatusEnum;
  items: IExtendedItem[];
  error?: string | null;
}
