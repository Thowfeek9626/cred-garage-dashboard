export type Benefit = {
  id:string,
    title: string;
    icon: string;
    desc: string;
    cta: string;
  };

  export type Reward = {
    id:string;
    userId:string;
    currentXp: number;
    totalXP: number;
  }

  export type Profile = {
    id:string,
    name: string;
    role: string;
    level?: number;
    avatar:string,
    progress?: number;
    rewards?: Reward
  };