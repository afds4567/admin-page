import { Member } from './member';
import { Pin } from './pin';
import { Topic } from './topic';

export type SearchResult = Pin | Member | Topic;

export function isPin(result: SearchResult): result is Pin {
  return (result as Pin).address !== undefined;
}

export function isMember(result: SearchResult): result is Member {
  return (result as Member).nickName !== undefined;
}

export function isTopic(result: SearchResult): result is Topic {
  return (result as Topic).image !== undefined;
}
