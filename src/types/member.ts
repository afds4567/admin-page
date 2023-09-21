import { Topic } from './topic';

export interface Member {
  id: number;
  nickName: string;
  email: string;
  imageUrl: string;
  updatedAt: Date;
}

export interface MemberDetail {
  id: number;
  nickName: string;
  email: string;
  imageUrl: string;
  updatedAt: Date;
  topics: Topic[];
}
