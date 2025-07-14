import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type Benefit = {
  id:string;
  icon: IconProp;
  title: string;
  desc: string;
  cta: string;
}

  export type Reward = {
    id:string;
    userId:string;
    currentXp: number;
    totalXP: number;
  }

  export type Profile = {
    id:string,
    fullName: string;
    level?: number;
    progress: number;
    email:string;
  };