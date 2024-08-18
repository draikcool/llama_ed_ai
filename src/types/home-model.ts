import { ApiResponseData } from "./api"

interface Assistant {
  id: number
  assistant_id: number
  name: string
  icon: string
  selected: boolean
}

export type AssistantData = ApiResponseData<Assistant[]>

interface VipInfo {
  nums: number;
  free_nums: number;
  day_nums: number;
  used_nums: number;
  show_vip: number;
}

export type VipInfoData = ApiResponseData<VipInfo>


