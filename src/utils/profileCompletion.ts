
export interface ProfileFields {
  name?: string;
  email?: string;
  gender?: string;
  birthdate?: string;
  phone?: string;
  startDate?: string;
  currentTherapy?: string;
  avatar?: string;
}

interface ProfileCompletionResult {
  percent: number;
  missing: string[];
  firstMissingKey?: keyof ProfileFields;
}

const PROFILE_KEYS: (keyof ProfileFields)[] = [
  "name",
  "email",
  "gender",
  "birthdate",
  "phone",
  "startDate",
  "currentTherapy",
  "avatar",
];

export function calculateProfileCompletion(profileData: ProfileFields): ProfileCompletionResult {
  let filled = 0;
  let firstMissingKey: keyof ProfileFields | undefined = undefined;
  const missing: string[] = [];

  PROFILE_KEYS.forEach((key) => {
    if (profileData[key] && String(profileData[key]).trim() !== "") {
      filled++;
    } else {
      if (!firstMissingKey) firstMissingKey = key;
      missing.push(key);
    }
  });

  const percent = Math.round((filled / PROFILE_KEYS.length) * 100);

  return {
    percent,
    missing,
    firstMissingKey,
  };
}
