export type TokenPayload = {
  profile: ProfileData;
  accountId: string;
  username: string;
  avatar?: string;
  roles?: string;
  userId?: string;
};

export type ProfileData = {
  common_core: CommonCoreProfile;
  athena: AthenaProfile;
};

interface AthenaProfile {
  currentCharacter: string;
  seasonLevel: number;
  seasonXp: number;
  bookPurchased: boolean;
  bookLevel: number;
  bookXp: number;
}

interface CommonCoreProfile {
  vbucks: number;
}
