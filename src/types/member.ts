import { Topic } from './topic';

export interface Member {
  id: number;
  nickName: string;
  email: string;
  imageUrl: string;
  updatedAt: string;
}

export interface MemberDetail {
  id: number;
  nickName: string;
  email: string;
  imageUrl: string;
  updatedAt: string;
  topics: Topic[];
}
