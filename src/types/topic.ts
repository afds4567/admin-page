import { Pin } from './pin';

export interface Topic {
  id: number;
  name: string;
  image: string;
  creator: string;
  pinCount: number;
  isInAtlas: boolean;
  bookmarkCount: number;
  isBookmarked: boolean;
  updatedAt: string;
}

export interface TopicDetail {
  id: number;
  name: string;
  description: string;
  image: string;
  creator: string;
  pinCount: number;
  isInAtlas: boolean;
  bookmarkCount: number;
  isBookmarked: boolean;
  canUpdate: boolean;
  updatedAt: string;
  pins: Pin[];
}
